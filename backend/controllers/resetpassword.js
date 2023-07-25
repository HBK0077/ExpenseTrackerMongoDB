const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const Forgotpassword = require("../models/forgotpassword");
const uuid = require("uuid");
const Sib = require("sib-api-v3-sdk");//sib used for mailing in forgotpassword
require('dotenv').config();


exports.forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        // console.log(email);
        const User = await user.find({
            email: email
         });
        console.log(User);
        if(User){
            const id = uuid.v4(); //UUID--> uriversally unique identifier
            console.log(id);
            const result =  new Forgotpassword({ 
                _id: id , 
                active: true,
                userId: User[0]._id
             });
             
            console.log(result); 
            await result.save();
            const client=Sib.ApiClient.instance
            
        const apiKey=client.authentications['api-key']
        apiKey.apiKey=process.env.SENDINBLUE_API_KEY
        
        const transEmailApi=new Sib.TransactionalEmailsApi();
        const sender={
            email:"hrishikeshbalakrishna07@gmail.com"
        }
    
        const receivers=[
            {
                email:email
            }
        ]
        const data= await transEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:`this is the test subject`,
            textcontent:`reset password`,
            htmlContent:`<a href="http://localhost:3500/resetpassword/${id}">Reset password</a>`
            
        })
        console.log(data);
        res.json({msg:"Mail sent successfully", success:true});
        }else{
            res.json({msg:"User doesnt exist", success:false});
        }
    }catch(error){
        console.log(error);
    }
}

exports.resetpassword = async(req, res) => {
    try{
        const id =  req.params.id;
    const forgotpasswordrequest = await Forgotpassword.find({
            _id: id
        })
    console.log(forgotpasswordrequest);
        if(forgotpasswordrequest){
            await Forgotpassword.findOneAndUpdate({_id:id},{ active: false});
            res.send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()


    }
    }catch(err){
        console.log(err);
    }

}

exports.updatepassword = async(req, res) => {

    try {
        const { newpassword } = req.query;
        const resetid  = req.params.rid;
        const resetpasswordrequest = await Forgotpassword.find({ _id: resetid })

        const User = await user.find({_id : resetpasswordrequest[0].userId})
                // console.log('userDetails', user)
                if(User) {
                    //encrypt the password
                        bcrypt.hash(newpassword, 5, async(err, hash)=>{
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            let data = await user.findOneAndUpdate({_id: User[0]._id},{ password: hash })
                            return res.json({message: 'Successfuly update the new password', success: true});

                    });
            } else{
                return res.json({ error: 'No user Exists', success: false})
            }
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}
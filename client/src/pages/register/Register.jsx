import './register.css';
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // console.log(info);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/hritik01478cloud/image/upload",
                data
            );

            const { url } = uploadRes.data;

            const newUser = {
                ...info,
                img: url,
            };
            // console.log(newUser);

            await axios.post("/auth/register", newUser);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='register'>
            <div className="wrapper">
                <div className="left">
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="right">
                    <form>
                        <div className="rInput">
                            <label htmlFor="file">
                                Image:  <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="rInput">
                            <label>username: </label>
                            <input type="text" placeholder="john_doe"
                                onChange={handleChange} id="username" />
                        </div>
                        <div className="rInput">
                            <label>email: </label>
                            <input type="text" placeholder="johndoe@gmail.com" onChange={handleChange} id="email" />
                        </div>
                        <div className="rInput">
                            <label>password: </label>
                            <input type="password" onChange={handleChange} id="password" />
                        </div>
                        <div className="rInput">
                            <label>phone: </label>
                            <input type="text" placeholder="(+91) 123456789" onChange={handleChange} id="phone" />
                        </div>
                        <div className="rInput">
                            <label>city: </label>
                            <input type="text" placeholder="New York" onChange={handleChange} id="city" />
                        </div>
                        <div className="rInput">
                            <label>country: </label>
                            <input type="text" placeholder="USA" onChange={handleChange} id="country" />
                        </div>

                        <button onClick={handleClick} className="rbtn">Send</button>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Register
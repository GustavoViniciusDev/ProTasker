import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image_kanban from '../imgs/kanban_imagem.png';
import './style.css';
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";


export default function Home() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // storing input name
        localStorage.setItem("name", JSON.stringify(name));
      }, [name]);

      const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            navigate("/kanban");
        }
      }

    return (
        <>
            <h1 className="tittle_home">
                Pro<span>Tasker</span>
            </h1>

            <div className="container_home">
                <div className="container_form">
                    <h1 className="slogan">A simple choice <br /> for a difficult task</h1>
                    <p className="description">Enter now</p>
                    <form className="form_login">
                        <div className="input_username">
                            <div className="color_bar"></div>
                            <FontAwesomeIcon icon={faUser} className="user_icon" />
                            <input value={name} onKeyDown={handlePressEnter}  onChange={(e) => setName(e.target.value)} className='username' type="text" placeholder="Enter your Username" />
                            <div className="color_bar_progress_hover"></div>
                        </div>
                        
                    </form>
                </div>

                <div className="container_image">
                    <img className="img_kanban" src={image_kanban} alt="imagem_kanban" />

                </div>
            </div>



        </>


    );
}

// import { Link } from "react-router-dom";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image_kanban from '../imgs/kanban_imagem.png';
import './style.css';

export default function Home() {


    return (
        <>
            <h1 className="tittle">
                Pro<span>Tasker</span>
            </h1>

            <div className="container_home">
                <div className="container_form">
                    <h1 className="slogan">A simple choice <br /> for a difficult task</h1>
                    <p className="description"></p>
                    <form className="form_login" action="">
                        <div className="input_email">
                            <div className="color_bar"></div>
                            <FontAwesomeIcon icon={faEnvelope} className="email_icon" />
                            <input className='email' type="email" placeholder="Enter your email" />
                            <div className="color_bar_progress_hover"></div>
                        </div>
                        <div className="login_register">
                            <button className="submit"> Login</button>
                            <div className="register_text">
                                <p>Click here <br/>to register</p>
                            </div>
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
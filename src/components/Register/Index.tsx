
import { faEnvelope, faUser, faClock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.css';

export default function Register(){

    return(
        <>
            <div className="container_register">
                <div className="container_form_register">

                    <h1 className="slogan_register">Don't leave for later what you can start now <br/> <span>Register now</span></h1>

                    <form action="" className="form_register">
                            <div className="input_name">
                                <div className="color_bar"></div>
                                <FontAwesomeIcon icon={faUser} className="user_icon" />
                                <input className='name' type="text" placeholder="Type your User Name" />
                                <div className="color_bar_progress_hover_user"></div>
                            </div>
                            <div className="input_email">
                                <div className="color_bar"></div>
                                <FontAwesomeIcon icon={faEnvelope} className="email_icon" />
                                <input className='email' type="email" placeholder="Type your email" />
                                <div className="color_bar_progress_hover"></div>
                            </div>
                            <div className="input_password">
                                <div className="color_bar"></div>
                                <FontAwesomeIcon icon={faClock} className="password_icon" />
                                <input className='password' type="password" placeholder="Type your Password" />
                                <div className="color_bar_progress_hover_pass"></div>
                            </div>
                            <div className="input_conf_password">
                                <div className="color_bar"></div>
                                <FontAwesomeIcon icon={faClock} className="password_conf_icon" />
                                <input className='conf_password' type="password" placeholder="Confirm your password" />
                                <div className="color_bar_progress_hover_conf_pass"></div>
                            </div>
                    </form>
                </div>
            </div>
        </>
    );

}
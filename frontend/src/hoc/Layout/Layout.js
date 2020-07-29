import React, { Component} from 'react';

import Aux from '../Auxillary/Auxillary';
import Logo from '../../components/Logo/Logo';
import LanguageSelector from '../../components/UI/LanguageSelector/LanguageSelector';
import VolumeSelector from '../../components/UI/VolumeSelector/VolumeSelector';
import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';
import SocialLinks from '../../components/Navigation/SocialLinks/SocialLinks';
import SignInButton from '../../components/UI/SignInButton/SignInButton';
import SettingsButton from '../../components/UI/SettingsButton/SettingsButton';
import ProfileWrapperAuthorized from './ProfileWrapperAuthorized/ProfileWrapperAuthorized';
import { AuthContext } from '../../context/auth-context';

import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        language : "EN",
        volume : true,
        showLanguages : false,
        showLinks : false,
        showSettings : false,
        animation: false,
    };

    static contextType = AuthContext;


    changeVolumeHandler = () => {
        this.setState({ volume : !this.state.volume });
    };

    showLanguageMenuHandler = () => {
        this.setState({showLanguages : !this.state.showLanguages});
    };
    changeEnLanguage = () => {
        this.setState({ 
            language : "EN",
            showLanguages : false
        });
    };
    changeRULanguage = () => {
        this.setState({
            language : "RU",
            showLanguages : false
        });
    };

    showLinksMenuHandler = () => {
        this.setState({showLinks : !this.state.showLinks});
    };

    showSettingsHandler = () => {
        this.setState({showSettings : true});
    }
    closeSettingsHandler = () => {
        this.setState({showSettings : false});
    }

    changeAnimationHandler = () => {
        this.setState({animation : !this.state.animation});
    }

    authorizedChangedHandler = () => {
        this.setState({authorized : !this.state.authorized});
    }

    render() {
        return (
            <Aux>
                <div className={classes.Layout}>
                    <Logo />
                    <LanguageSelector 
                        language={this.state.language}
                        show={this.state.showLanguages}
                        clicked={this.showLanguageMenuHandler}
                        ENChange={this.changeEnLanguage}
                        RUChange={this.changeRULanguage}/>
                    <VolumeSelector 
                        clicked={this.changeVolumeHandler}
                        volume={this.state.volume}/>
                    <DropDownMenu 
                        clicked={this.showLinksMenuHandler}
                        show={this.state.showLinks}/> 
                    <div className={classes.LayoutRightSide}>              
                        <SocialLinks />
                        {this.context.isLoggedIn ? (
                            <ProfileWrapperAuthorized 
<<<<<<< HEAD
                                clicked={this.authorizedChangedHandler}/>
                        ) : (
                            [
                                <SignInButton 
                                    clicked={this.authorizedChangedHandler}/> ,
=======
                                clicked={this.context.logout}/>
                        ) : [
                                <SignInButton /> ,
>>>>>>> 0f8d0d7749b9602e31f015f09d0a03752a14cb49
                                <SettingsButton 
                                    showSettings={this.state.showSettings}
                                    settingsHandler={this.showSettingsHandler}
                                    closeSettings={this.closeSettingsHandler}
                                    changeAnimation={this.changeAnimationHandler}
                                    animation={this.state.animation}/>
                            ]
                        )}
                    </div>
                </div> 
               {this.props.children}
            </Aux>
        );
    }
};

export default Layout;
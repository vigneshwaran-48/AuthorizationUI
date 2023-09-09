import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "../css/personal-info.css";
import { Common } from "../utility/Common";
import { motion } from "framer-motion";
import RequireAuth from "../utility/RequireAuth";
import { UserAPI } from "../api/UserAPI";
import { useLoaderData } from "react-router";
import Loading from "../utility/Loading";
import { Form } from "react-router-dom";
import useApp from "../AppProvider";

export const personalInfoLoader = async ({ params }) => {
    await RequireAuth();
    return UserAPI.getCurrentUserDetails();
}

export const personalInfoAction = async ({ params, request }) => {
    await RequireAuth();
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const splittedDate = data.dob.split("-");
    if(splittedDate) {
        console.log(splittedDate);
        data.dob = formatDate(...splittedDate);
    }

    return UserAPI.updateUser(data);
}
const formatDate = (year, month, day) => {
    day = day.slice(0, 2);
    month = month.slice(0, 2);
    year = year.slice(0, 4);
    return Common.checkAndGiveDoubleDigit(year) + "-" + 
           Common.checkAndGiveDoubleDigit(month) + "-" +
           Common.checkAndGiveDoubleDigit(day);
}
const formatDayJsDate = dayJsDate => {
    let {$D, $y, $M} = dayJsDate;
    console.log($D, $M, $y);

    return formatDate($D, $M, $y);               
}

const fieldLengthObj = {
    userName: 5,
    firstName: 10,
    lastName: 10
}

const validFieldBorderColor = "rgba(0, 0, 0, 0.2)";

const PersonalInfo = () => {

    const loaderData = useLoaderData();

    const [ userDetails, setUserDetails ] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: dayjs("2000-12-31"),
        mobile: "",
        id: -1
    });

    const [ fieldState, setFieldState ] = useState({
        userName: true,
        firstName: true,
        lastName: true,
        email: true,
        mobile: true
    })

    const [ profileImage, setProfileImage ] = useState("app-icon.png");

    const app = useApp();

    useEffect(() => {

        loaderData?.user && setUserDetails({
                        userName: loaderData.user.userName,
                        firstName: loaderData.user.firstName ? loaderData.user.firstName : "",
                        lastName: loaderData.user.lastName ? loaderData.user.lastName : "",
                        email: loaderData.user.email,
                        mobile: loaderData.user.mobile ? loaderData.user.mobile : "",
                        dob: loaderData.user.dob,
                        id: loaderData.user.id || -1
                      });
        app.updateUserImage(loaderData.user.profileImage || "/person.png");
        setProfileImage(loaderData.user.profileImage || "/person.png");
    }, [ profileImage ]);

    if(!loaderData) {
        return <Loading />
    }

    const handleDateChange = newValue => {

        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                dob: formatDayJsDate(newValue)
            }
        })
    }

    const handleImageChange = async event => {
        const file = event.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append("profileImage", file);
        
        setProfileImage("gifs/image-uploading.gif");

        const response = await UserAPI.uploadImage(formData, userDetails.id)
        if(response.ok) {
            Common.showSuccessPopup("Image uploaded successfully!", 2);
            setProfileImage(userDetails.profileImage);
        }
        else {
            Common.showErrorPopup("Oops! Something went wrong", 2);
        }
    }

    const handleFormChange = event => {
        const { name, value } = event.target;

        let fieldStateValue = true;

        if(fieldLengthObj[name] && !Common.checkLength(value, Common.minNameLength,
                                                         fieldLengthObj[name])) {
            fieldStateValue = false;
        }
        else if(name === "email") {
            if(!Common.isValidMail(value)) {
                fieldStateValue = false;
            }
        }
        if(name === "mobile") {
            if(!Common.isValidMobileNum(value)) {
                fieldStateValue = false;
            }
        }
        setUserDetails(prevDetails => {
            return {
                ...prevDetails,
                [ name ]: value
            }
        });
        setFieldState(prevState => {
            return {
                ...prevState,
                [ name ]: fieldStateValue
            }
        });
    }

    return (
        <motion.div 
            className="personal-info y-axis-flex"
            initial={ Common.mainElementsFramerVariants.slideFromRight }
            animate={ Common.mainElementsFramerVariants.stay }
            exit={ Common.mainElementsFramerVariants.exit }
            transition={ Common.mainElementsFramerVariants.elemTransition }
        >
            <h1>Personal Info</h1>

            <div className="user-info-page y-axis-flex">
                <div className="user-info-image-container">
                    <img 
                        src={profileImage} 
                        alt="user" 
                        className="user-info-image" />

                    <div className="profile-image-upload-overlay x-axis-flex">
                        <label for="profile-image-input">
                            <img src="camera.png" alt="camera" />
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            name="profileImage"
                            id="profile-image-input"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <Form 
                    className="user-account-form x-axis-flex"
                    method="put"
                >
                    <div className="accounts-input-wrapper y-axis-flex">
                        <label>Name</label>
                        <input 
                            name="userName"
                            value={ userDetails.userName }
                            onChange={ handleFormChange }
                            style={{
                                borderColor: fieldState.userName 
                                                ? validFieldBorderColor 
                                                : "red"
                            }}
                        />
                    </div>
                    <div className="accounts-input-wrapper y-axis-flex">
                        <label>First Name</label>
                        <input 
                            name="firstName"
                            value={ userDetails.firstName }
                            onChange={ handleFormChange }
                            style={{
                                borderColor: fieldState.firstName 
                                                ? validFieldBorderColor 
                                                : "red"
                            }}
                        />
                    </div>
                    <div className="accounts-input-wrapper y-axis-flex">
                        <label>Last Name</label>
                        <input 
                            name="lastName"
                            value={ userDetails.lastName }
                            onChange={ handleFormChange }
                            style={{
                                borderColor: fieldState.lastName 
                                                ? validFieldBorderColor 
                                                : "red"
                            }}
                        />
                    </div>
                    <div 
                        className="accounts-input-wrapper user-date-wrapper y-axis-flex">
                        <DatePicker 
                            label="Date of Birth" 
                            value={dayjs(userDetails.dob)} 
                            onChange={handleDateChange} 
                            views={["year", "month", "day"]}
                            disableFuture
                            className="user-dob-setting"
                        />
                        <input 
                            type="text" 
                            name="dob" 
                            value={userDetails.dob} 
                            hidden
                        />
                    </div>
                    <div className="accounts-input-wrapper y-axis-flex">
                        <label>Email</label>
                        <input 
                            name="email"
                            value={ userDetails.email }
                            onChange={ handleFormChange }
                            style={{
                                borderColor: fieldState.email 
                                            ? validFieldBorderColor 
                                            : "red"
                            }}
                        />
                    </div>
                    <div className="accounts-input-wrapper y-axis-flex">
                        <label>Mobile No</label>
                        <input 
                            name="mobile"
                            type="number"
                            value={ userDetails.mobile }
                            onChange={ handleFormChange }
                            style={{
                                borderColor: fieldState.mobile 
                                                ? validFieldBorderColor 
                                                : "red"
                            }}
                        />
                    </div>
                    <input 
                        type="number" 
                        name="id" 
                        value={userDetails.id } 
                        hidden 
                    />
                    <button 
                        className="common-button personal-info-update-button"
                    >Update</button>
                </Form>
            </div>
        </motion.div>
    )
}

export default PersonalInfo;
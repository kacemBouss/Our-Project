import React, { Component } from 'react';
import * as Components from './Components';
import axios from 'axios';
import { useState } from 'react';
import { BiSolidError } from 'react-icons/bi';
import Cookies from 'js-cookie';
// import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

function Next_Re() {
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  const [Accept, SetAccept] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sexe, setSexe] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [Error, Set_Error] = useState('');

  const Succes_msg = () => toast.success(' your Register seccesfuly !', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const Error_msg = () => toast.error(' your Register has error !', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const errors = [];
  function affiche_error() {
    if (firstName === "") {
      errors.push(<Components.Error_text><BiSolidError className='text-danger'/> &nbsp; <span>the first name must be required</span></Components.Error_text>);
      return errors;
    }
    if (lastName === "") {
      errors.push(<Components.Error_text><BiSolidError className='text-danger'/> <span>the last name must be required</span></Components.Error_text>);
      return errors;
    }
    if (sexe === "") {
      errors.push(<Components.Error_text><BiSolidError className='text-danger'/> <span>the sexe must be required</span></Components.Error_text>);
      return errors;
    }
    if (date === "") {
      errors.push(<Components.Error_text><BiSolidError className='text-danger'/> <span>the date of birthday must be required</span></Components.Error_text>);
      return errors;
    }
    if (image === null) {
      errors.push(<Components.Error_text><BiSolidError className='text-danger'/> <span>the photo profile must be required</span></Components.Error_text>);
      return errors;
    }
    // errors.push(<Components.Error_text className='text-light'>now, you can sign up correctly!</Components.Error_text>);
    return <Components.Error_text className='text-light'>now, you can sign up correctly!</Components.Error_text>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const validationErrors = affiche_error();
    
    // const navigate = useNavigate();
    errors.length === 0 ? window.location.href = '/questions' : console.log('there is an error in the entering your information');
  }

  const handleSexe = (event) => {
    setSexe(event.target.value);
  }

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      setImage(null);
      setImageError('Please select an image file.');
      return;
    }

    // Check if the file format is allowed (PNG, JPG, JPEG)
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedFormats.includes(selectedFile.type)) {
      setImage(null);
      setImageError('Invalid image format. Please select a PNG, JPG, or JPEG file.');
      return;
    }

    // Reset any previous error messages
    setImageError('');

    // Update the state with the selected image file
    setImage(selectedFile);
  };

  const getData = async () => {
    try {
      const response = await axios.post('http://192.168.43.12:8000/userinfo/', {
        timeout: 5000,
        withCredentials: true,
        sessionid: "54utdmjjg84at5ttt1uxoj4ppfdoly80",
        headers: {
          'Content-Type': 'application/json',
          // Add any other necessary headers
        },
      });
      console.log(response.data);
      alert("succesfuly ")
    } catch (error) {
      alert("you have error")
      console.error('Error fetching data:', error);
    }
  };

  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    SetAccept(true);
    if (flag) {
      await axios
        .post('http://192.168.43.12:8000/signup/', {
          firstName: firstName,
          lastName: lastName,
        })
        .then(respons => {
          //   Handle a successful response here
            
          console.log(respons.status);
          if (respons.status === 201) {
            console.log(respons.data.sessionid);
            Succes_msg();
            Cookies.set('username', firstName, { expires: expirationDate });
            Cookies.set('sessionid', respons.data.sessionid, { expires: expirationDate });
            window.location.pathname = `/next-re/`;
          }
        })
        .catch(error => {
          Error_msg();
          Set_Error(error.response.status)
          if (error.response.status === 422) {
            // Handle 422 validation errors
            console.log('Validation Errors:', error.response.data);
          } else {
            // Handle other errors
            console.error('Request failed with status code', error.response.status);
          }
        });
    }
  }
    async function Post_Data(e) {
      e.preventDefault();
      SetAccept(true);
      const Form_filed = new FormData();
      Form_filed.append('Sexe', sexe);
      Form_filed.append('birthday', date);
    
      let flag = true;
    
      if (affiche_error().length > 0) {
        flag = false;
      } else {
        flag = true;
        Form_filed.append('image', image);
      }
    
      if (!flag) {
        try {
          const response = await axios.post('http://192.168.43.12:8000/userinfo/', {
            data: Form_filed,
          });
          console.log(response.data);
          alert('Successfully submitted');
        } catch (error) {
          alert('Error submitting data');
          console.error('Error fetching data:', error);
        }
      }
    }
    


  return (
    // <Animation>
    <div>
      <Components.Body>
        {/* <ToastContainer
        // position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
        <Components.Container className='container text-center'>

          <div className='row'>

            <div className='head col-12 p-3'>
              <Components.Title className='text-light m-3'>You're Welcome!</Components.Title>
              <Components.Paragraph className='m-0 col-11 m-auto text-center text-light'>
                Welcome back, Kacem! Your recovery journey begins here.
                Embrace a healthier relationship with gaming!
              </Components.Paragraph>
            </div>
            <Components.Form_next onSubmit={handleSubmit} className='col-lg-12 col-md-12 col-sm-12 p-3 bg-transparent'>
              <Components.Input className='col-lg-5 col-md-5 col-sm-11 m-2' type='text' placeholder='First Name' onChange={(e) => { setFirstName(e.target.value) }} />
              <Components.Input className='col-lg-5 col-md-5 col-sm-11 m-2' type='text' placeholder='Last Name' onChange={(e) => { setLastName(e.target.value) }} />
              <div className='p-0 col-lg-5 col-md-5 col-sm-11 m-2 d-inline-block'>
                <Components.Input_radio className='d-flex justify-content-around'>
                  <p className='m-0 text-left text-secondary fw-100' style={{ fontSize: '16px' }}>You are:</p>
                  <div className='d-flex'>
                    <Components.Input type='radio' onChange={handleSexe} checked={sexe === 'male'} name='sexe' value={'male'} className='m-0' id='male'>
                    </Components.Input>
                    <label for='male' className='m-0 ml-1'>Male</label>
                  </div>
                  <div className='d-flex'>
                    <Components.Input type='radio' onChange={handleSexe} checked={sexe === 'female'} className='m-0' name='sexe' value={'female'} id='female'>
                    </Components.Input >
                    <label for='female' className='m-0 ml-1'>Female</label>
                  </div>
                </Components.Input_radio>
              </div>
              <div className='col-lg-5 col-md-5 col-sm-11 m-2 p-0 d-inline-block'>
                <Components.Lable className='text-secondary m-0 w-50'>Your birthday</Components.Lable>
                <Components.Input className='m-0 w-50' type='date' onChange={(e) => setDate(e.target.value)}/>
              </div>
              <Components.Lable className='text-secondary col-lg-5 col-md-5 col-sm-11 m-0 m-2'> Your Photo Profile: </Components.Lable>
              <Components.Input className='col-lg-5 col-md-5 col-sm-11 m-0 m-2' onChange={handleImageChange} type='file' accept=".png, .jpeg, .jpg"/>
              {/* {imageError && <p className="error">{imageError}</p>} */}
              {/* <small className="text-muted m-0">Allowed file types: PNG, JPEG, JPG</small> */}
              {affiche_error()}
              <Components.Button type='submit' className='m-2 d-inline-block'>
                {/* <button className='' onClick={affiche_error} /> */}
                  SIGN UP
              </Components.Button>
            
            </Components.Form_next>
          </div>
        </Components.Container>
      </Components.Body >
      </div>
      // {/* </Animation> */}
  )
}


export default Next_Re;
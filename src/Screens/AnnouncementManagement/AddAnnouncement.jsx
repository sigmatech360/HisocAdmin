import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const AddAnnouncement = () => {
    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        image: '', // Initialize image as an empty string
    });



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    const filehandleChange = (event) => {
        const file = event.target.files[0];
        // console.log(file.name)
        if (file) {
          const fileName = file;
          setFormData((prevData) => ({
            ...prevData,
            image: fileName,
          }));
        }
        console.log(formData)
      };
      



        const LogoutData = localStorage.getItem('login');


        const handleSubmit = (event) => {
            event.preventDefault();

            // Create a new FormData object
            const formDataMethod = new FormData();
            for (const key in formData) {
                formDataMethod.append(key, formData[key]);
            }

            console.log(formData)
            document.querySelector('.loaderBox').classList.remove("d-none");
            // Make the fetch request
            fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/genre_add_update`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
                body: formDataMethod // Use the FormData object as the request body
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(data);
                    setShowModal(true)
                })
                .catch((error) => {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    console.log(error)
                })
        };




        return (
            <>
                <DashboardLayout>
                    <div className="dashCard mb-4">
                        <div className="row mb-3">
                            <div className="col-12 mb-2">
                                <h2 className="mainTitle">
                                    <BackButton />
                                    Add Announcement
                                </h2>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Genre Title'
                                                        required
                                                        id='title'
                                                        type='text'
                                                        placeholder='Enter Genre Title'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Name'
                                                        required
                                                        id='name'
                                                        type='text'
                                                        placeholder='Enter Name'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                               
                                                <div className="col-md-6 mb-4">
                                                    <CustomInput
                                                        label='Upload Product Image'
                                                        required
                                                        id='file'
                                                        type='file'
                                                        labelClass='mainLabel'
                                                        inputClass='mainInput'
                                                        name="image"
                                                        // value={formData.image}
                                                        onChange={filehandleChange}
                                                    />
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="inputWrapper">
                                                        <div className="form-controls">
                                                            <label htmlFor="">Description</label>
                                                            <textarea
                                                                name="description"
                                                                className="form-control shadow border-0"
                                                                id=""
                                                                cols="30"
                                                                rows="10"
                                                                value={formData.description}
                                                                onChange={handleChange}
                                                            >
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Genre added Successfully.' />

                </DashboardLayout>
            </>
        );
    };


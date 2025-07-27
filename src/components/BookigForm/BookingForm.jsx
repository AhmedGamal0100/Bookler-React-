import { useDispatch, useSelector } from 'react-redux';
import './BookingForm.css';
import { Alert, Input, Select, Divider, DatePicker, notification, Modal, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { setFormData, pushDataInLocalStorage, resetStore, clearIsPushed } from '../../stores/BookingSlicer';
import { useBlocker } from "../../hooks/useBlocker";
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const BookingForm = ({ data, profile }) => {
    const isVerticalNavClosed = useSelector((state) => state.verticalNav.closedNav);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const isPushed = useSelector((state) => state.booking.isPushed)

    if (!data) return null;

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues: {
            title: 'Mr',
            firstName: `${profile?.username}`,
            lastName: '',
            email: `${profile?.email}`,
            country: '',
            mobile: `${profile?.phone}`,
            cardNumber: '',
            cvv: '',
            expiryDate: null,
            cardHolder: '',
            hotelId: `${data.id}`
        }
    });

    const dateFormat = 'YYYY/MM/DD';

    const onSubmit = (formData) => {
        const serializedData = {
            ...formData,
            expiryDate: formData.expiryDate ? dayjs(formData.expiryDate).toISOString() : null
        };

        dispatch(setFormData(serializedData));
        dispatch(pushDataInLocalStorage());

    };

    useEffect(() => {
        if (isPushed) {
            reset();
            dispatch(resetStore());
            api.open({
                message: 'Booking Successful',
                description: 'Your booking has been saved, redirecting to your booking list!',
                type: 'success',
                showProgress: true,
                duration: 3,
            });

            dispatch(clearIsPushed());

            setTimeout(() => {
                navigate('/mybooking');
            }, 3000);
        }
    }, [isPushed]);

    const [modalOpen, setModalOpen] = useState(false);
    const [isCloseAnyWay, setIsCloseAnyWay] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    const handleModalClose = async (val) => {
        setModalOpen(false);
        await setIsCloseAnyWay(val)
        if (val) {
            await navigate("/");
        }
    };

    useBlocker(() => {
        if (isDirty) {
            showModal()
            if (isCloseAnyWay)
                return true
            else return false
        }
        return false;
    }, isDirty);

    return (
        <>
            <div className="form" style={{ width: isVerticalNavClosed ? '622px' : '862px' }}>
                {contextHolder}
                <div className="form__container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>Your Details</h3>
                        <p>
                            Whether you are in town for business or leisure, <b>{data.name}</b> welcomes travelers to{" "}
                            <b>{data.address.city}</b> with exceptional service, spacious
                        </p>

                        <div className="form__flex">
                            <div className="form__input" style={{ width: "20%" }}>
                                <label>Title</label>
                                <Controller
                                    name="title"
                                    control={control}
                                    rules={{ required: "Title is required" }}
                                    render={({ field }) => (
                                        <Select
                                            className='form__input-select'
                                            {...field}
                                            options={[
                                                { value: 'Mr', label: 'Mr' },
                                                { value: 'Mrs', label: 'Mrs' },
                                            ]}
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <Alert message={errors.title.message} type="error" showIcon />
                                )}
                            </div>

                            <div className="form__input" style={{ width: "40%" }}>
                                <label>First Name</label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{ required: "First name is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                        />
                                    )}
                                />
                                {errors.firstName && (
                                    <Alert message={errors.firstName.message} type="error" showIcon />
                                )}
                            </div>

                            <div className="form__input" style={{ width: "40%" }}>
                                <label>First Name</label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{ required: "Last name is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                        />
                                    )}
                                />
                                {errors.lastName && (
                                    <Alert message={errors.lastName.message} type="error" showIcon />
                                )}
                            </div>
                        </div>

                        <div className="form__input" style={{ width: "100%", marginBottom: "25px" }}>
                            <label>Email</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="yourmail@gmail.com"
                                    />
                                )}
                            />
                            {errors.email && (
                                <Alert message={errors.email.message} type="error" showIcon />
                            )}
                        </div>

                        <div className="form__flex" style={{ marginBottom: "54px" }}>
                            <div className="form__input" style={{ width: "25%" }}>
                                <label>Country</label>
                                <Controller
                                    name="country"
                                    control={control}
                                    rules={{ required: "Country is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder='Country'
                                        />
                                    )}
                                />
                                {errors.country && (
                                    <Alert message={errors.country.message} type="error" showIcon />
                                )}
                            </div>

                            <div className="form__input" style={{ width: "75%" }}>
                                <label>Mobile</label>
                                <Controller
                                    name="mobile"
                                    control={control}
                                    rules={{
                                        required: "Mobile is required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="+2 000 0000 0000"
                                        />
                                    )}
                                />
                                {errors.mobile && (
                                    <Alert message={errors.mobile.message} type="error" showIcon />
                                )}
                            </div>
                        </div>

                        <Divider style={{ marginBottom: "24px" }} />
                        <h3 style={{ marginBottom: "22px" }}>Payment Details</h3>

                        <div className="form__input" style={{ width: "100%", marginBottom: "22px" }}>
                            <label>Card Number</label>
                            <Controller
                                name="cardNumber"
                                control={control}
                                rules={{
                                    required: "Card Number is required",
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: "Card must be 16 digits"
                                    }
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                    />
                                )}
                            />
                            {errors.cardNumber && (
                                <Alert message={errors.cardNumber.message} type="error" showIcon />
                            )}
                        </div>

                        <div className="form__flex">
                            <div className="form__input" style={{ width: "50%" }}>
                                <label>CVV</label>
                                <Controller
                                    name="cvv"
                                    control={control}
                                    rules={{
                                        required: "CVV is required",
                                        pattern: {
                                            value: /^\d{3}$/,
                                            message: "CVV must be 3 digits"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="XXX"
                                        />
                                    )}
                                />
                                {errors.cvv && (
                                    <Alert message={errors.cvv.message} type="error" showIcon style={{ marginTop: 5 }} />
                                )}
                            </div>

                            <div className="form__input" style={{ width: "50%" }}>
                                <label>Expiry Date</label>
                                <Controller
                                    name="expiryDate"
                                    control={control}
                                    rules={{ required: "Expiry date is required" }}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            format={dateFormat}
                                            className="form__input-date"
                                            onChange={(date) => field.onChange(date)}
                                        />
                                    )}
                                />
                                {errors.expiryDate && (
                                    <Alert message={errors.expiryDate.message} type="error" showIcon style={{ marginTop: 5 }} />
                                )}
                            </div>
                        </div>

                        <div className="form__input" style={{ width: "100%", marginBottom: "37px" }}>
                            <label>Card Holder</label>
                            <Controller
                                name="cardHolder"
                                control={control}
                                rules={{
                                    required: "Card holder is required",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your card holder name"
                                    />
                                )}
                            />
                            {errors.cardHolder && (
                                <Alert message={errors.cardHolder.message} type="error" showIcon style={{ marginTop: 5 }} />
                            )}
                        </div>

                        <button type="submit" className="form__submit-btn">
                            PAY NOW
                        </button>
                    </form>
                </div>
            </div>

            <Modal
                title="Register Success"
                open={modalOpen}
                footer={[
                    <Button key='login' type="primary" onClick={() => handleModalClose(true)} danger>
                        Sure
                    </Button>,
                    <Button key='close' type="primary" onClick={() => handleModalClose(false)}>
                        Close
                    </Button>
                ]}
                closable={false}
                centered
            >
                <p style={{ textAlign: "center" }}><b>You didn't save the form, are you sure you want to exit?</b></p>
            </Modal>
        </>
    );
};

export default BookingForm;

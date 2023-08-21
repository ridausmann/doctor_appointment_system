import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDocById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        console.log(doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle appointmnet booking
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feePerConsultation}</h4>
            <h4>
              {/* Timings: {doctors.timings[0]} - {doctors.timings[1]} */}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                format="DD-MM-YYYY"
                className="m-2"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => setTime(moment(value).format("HH:mm"))}
              />
              <button className="btn btn-primary mt-2">
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;

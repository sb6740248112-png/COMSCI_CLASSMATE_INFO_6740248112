import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/get_friend/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white rounded shadow p-4">
          <h1 className="mb-4" >User {id}</h1>

            <div className="d-flex justify-content-start mb-3 gap-3">
              <Link className="btn btn-success" to="/">
                กลับ
              </Link>
              <Link className="btn btn-warning" to="/home2">
                กลับ(แถว)
              </Link>
            </div>

          {data.map((friend) => {
            return (
              <ul className="list-group">
                <li className="list-group-item">
                  <b>ID: </b>
                  {friend["id"]}
                </li>
                <li className="list-group-item">
                  <b>ชื่อ-สกุล: </b>
                  {friend["name"]}
                </li>
                <li className="list-group-item">
                  <b>น้ำหนัก: </b>
                  {friend["weight"]}
                </li>
                <li className="list-group-item">
                  <b>ส่วนสูง: </b>
                  {friend["height"]}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {friend["email"]}
                </li>
                <li className="list-group-item">
                  <b>เบอร์โทร: </b>
                  {friend["tel"]}
                </li>
                <li className="list-group-item">
                  <b>อายุ: </b>
                  {friend["age"]}
                </li>
                <li className="list-group-item">
                  <b>เพศ: </b>
                  {friend["gender"]}
                </li>
                <li className="list-group-item text-center">
                  <b>รูปภาพ: </b><br />
                  {friend.image ? (
                    <img
                      src={`/uploads/${friend.image}`}
                      alt={friend.name}
                      style={{ maxWidth: "400px", maxHeight: "400px", margin: "0 auto", display: "block" }}
                    />
                  ) : (
                    <span>ไม่มีรูปภาพ</span>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
  );
}

export default Read;

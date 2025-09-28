import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/friends")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white rounded shadow p-4">
        <h3 className="text-center mb-4">ข้อมูลเพื่อนร่วมชั้น COMSCI 2025</h3>

        <div className="d-flex justify-content-between mb-3">
          <Link className="btn btn-warning" to="/home2">
            แบบแถว
          </Link>
        </div>

        <div className="row">
          {data.map((friend) => (
            <div key={friend.id} className="col-md-4 mb-4">
              <div className="card shadow rounded-3 h-100 text-center">
                <div className="card-header bg-light">
                  <img
                  src={
                      friend.image
                      ? `/uploads/${friend.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={friend.name}
                  className="rounded-circle mx-auto d-block"
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body text-start">
                  <p><b>ID:</b> {friend.id}</p>
                  <p><b>ชื่อ-นามสกุล:</b> {friend.name}</p>
                  <p><b>น้ำหนัก:</b> {friend.weight} กก.</p>
                  <p><b>ส่วนสูง:</b> {friend.height} ซม.</p>
                  <p><b>Email:</b> {friend.email}</p>
                  <p><b>เบอร์โทร:</b> {friend.tel}</p>
                  <p><b>อายุ:</b> {friend.age} ปี</p>
                  <p><b>เพศ:</b> {friend.gender}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                  <Link className="btn btn-success flex-fill mx-1" to={`/read/${friend.id}`}>
                    Read
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

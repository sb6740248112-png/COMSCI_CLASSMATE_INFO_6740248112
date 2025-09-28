import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HomeTwo() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    if (deleted) {
      setDeleted(false)
      axios
        .get('/friends')
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [deleted])

  return (
    <div className="bg-primary min-vh-100 py-4">
      <div className="container bg-white rounded shadow p-4">
        <h3 className="text-center mb-4">ข้อมูลเพื่อนร่วมชั้น COMSCI 2025(แถว)</h3>
        <div className="d-flex justify-content-between mb-3">
          <Link className="btn btn-success" to="/">
            แบบปกติ
          </Link>
          <Link className="btn btn-success" to="/create">
            เพิ่มข้อมูล
          </Link>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>รูปภาพ</th> {/* New Image header */}
              <th>ชื่อ-สกุล</th>
              <th>น้ำหนัก</th>
              <th>ส่วนสูง</th>
              <th>Email</th>
              <th>เบอร์โทร</th>
              <th>อายุ</th>
              <th>เพศ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((friend) => {
              return (
                <tr key={friend.id}>
                  <td>{friend.id}</td>
                  <td>
                    {friend.image ? (
                      <img
                        src={`/uploads/${friend.image}`} // Adjust path based on your backend
                        alt={friend.name}
                        style={{ maxWidth: '120px', maxHeight: '80px', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{friend.name}</td>
                  <td>{friend.weight}</td>
                  <td>{friend.height}</td>
                  <td>{friend.email}</td>
                  <td>{friend.tel}</td>
                  <td>{friend.age}</td>
                  <td>{friend.gender}</td>
                  <td>
                    <Link className="btn mx-2 btn-success" to={`/read/${friend.id}`}>
                      Read
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomeTwo

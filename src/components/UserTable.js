import React from 'react'

const UserTable = ({users}) => {
  console.log(users)
    return (
      <table className="table table-hover">
    <thead>
      <tr>
        <th>No</th>
        <th>Email</th>
        <th>Allowed Premium Status</th>
        <th>Request Limit</th>
        <th>Expand Limit</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.allowedPremiumStatuses.length ? user.allowedPremiumStatuses: 'None'}</td>
        <td>{user.requestLimit}</td>
        <td>{user.expandLimit}</td>
        <td><a className='btn btn-primary' href={`/app/users/${user.id}`}>Update</a></td>
      </tr>
     )}
    </tbody>
  </table>
    );
}

export default UserTable

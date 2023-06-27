import React from 'react'
import patient from "./../../assets/img/patients/patient1.jpg"

const User = () => {
  return (
    <>
				 <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Users</li>
              </ul>
            </div>
          </div>
        </div>
					<div className="row">
						<div className="col-md-12">
						

							<div className="card card-table">
								<div className="card-header">
									<h4 className="card-title">Appointment List</h4>
								</div>
								<div className="card-body">
									<div className="table-responsive">
										<table className="table table-hover table-center mb-0">
											<thead>
												<tr>
													<th>Doctor Name</th>
													<th>Speciality</th>
													<th>Patient Name</th>
													<th>Apointment Time</th>
													<th>Status</th>
													<th className="text-right">Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<h2 className="table-avatar">
															<a href="profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={patient} alt="User Image" /></a>
															<a href="profile.html">Dr. Ruby Perrin</a>
														</h2>
													</td>
													<td>Dental</td>
													<td>
														<h2 className="table-avatar">
															<a href="profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src={patient} alt="User Image" /></a>
															<a href="profile.html">Charlene Reed </a>
														</h2>
													</td>
													<td>9 Nov 2019 <span className="text-primary d-block">11.00 AM - 11.15 AM</span></td>
													<td>
														<div className="status-toggle">
															<input type="checkbox" id="status_1" className="check" checked />
															<label for="status_1" className="checktoggle">checkbox</label>
														</div>
													</td>
													<td className="text-right">
														$200.00
													</td>
												</tr>
											
											</tbody>
										</table>
									</div>
								</div>
							</div>

							
						</div>
					</div>
    </>
  )
}

export default User
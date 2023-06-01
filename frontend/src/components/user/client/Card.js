import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ job }) => {
    return (
        <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="card" style={{ color: 'grey', fontWeight: 'bold', backgroundColor: 'white' }}>
                <div className="card-body" >
                    <div style={{ minHeight: "3em" }}>
                        <h5 class="card-title text-center text-uppercase" style={{ color: 'black' }}>{job.title}</h5>
                        <hr />
                    </div>
                    <p class="card-text" ><b>Requires Skills:</b> {job.required_skills}</p>
                    <p class="card-text" ><b>Application Starting Time: </b>{job.application_start_time}</p>
                    <p class="card-text" ><b>Application Ending Time:</b> {job.application_ending_date}</p>
                    <p class="card-text" ><b>Possible Job Starting Time:</b> {job.starting_date}</p>
                    <Link to={`/client/jobs/application/${job.id}`}>
                        <button className="btn btn-outline-warning btn-sm">View Applications</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;
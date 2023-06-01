import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ job }) => {
    return (
        <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="card" style={{ color: 'grey', backgroundColor: 'white' }}>
                <div className="card-body" >
                    <div style={{ minHeight: "3em" }}>
                        <h5 class="card-title text-center text-uppercase" style={{ color: 'black' }}>{job.title}</h5>
                        <hr></hr>
                    </div>
                    <p className="card-text" ><b>Requires Skills:</b> {job.required_skills}</p>
                    <p className="card-text" ><b>Application Starting Time:</b> {job.application_start_time}</p>
                    <p className="card-text" ><b>Application Ending Time:</b> {job.application_ending_date}</p>
                    <p className="card-text" ><b>Possible Job Starting Time:</b> {job.starting_date}</p>
                    <Link to={`/worker/jobs/apply/${job.id}`}>
                        <button className="btn btn-outline-warning btn-sm">Apply Now</button>
                    </Link>
                    <Link to={`/`}>
                        <button className="btn btn-outline-success btn-sm" style={{ marginLeft: '2%' }}>View Description</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
/*
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `applicant_id` int(11) NOT NULL,
  `application_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_applications_1` (`job_id`),
  KEY `fk_applications_2` (`applicant_id`),
  CONSTRAINT `fk_applications_1` FOREIGN KEY (`job_id`) REFERENCES `advertised_jobs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_applications_2` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1
*/
export default Card;

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ApplicationModal = ({ job, toggle, modal, handleClick }) => {
    return (
        <div style={{ padding: "2%" }}>
            Please make sure you have read the job description throughly.<br /><br />
            <Button color="danger" onClick={toggle}>
                Yes, I have read the Job description and want to apply.
            </Button>
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader toggle={toggle}>{job.title}</ModalHeader>
                <ModalBody>
                    <p class="card-text" >Requires Skills: {job.required_skills}</p>
                    <p class="card-text" >Application Starting Time: {job.application_start_time}</p>
                    <p class="card-text" >Application Ending Time: {job.application_ending_date}</p>
                    <p class="card-text"  >Possible Job Starting Time: {job.starting_date}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleClick}>
                        Apply Now
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ApplicationModal;
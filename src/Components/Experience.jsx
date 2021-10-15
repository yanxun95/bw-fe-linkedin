import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Row, Col } from "react-bootstrap";
import "../experience.css";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";

const Experience = ({ match }) => {
  const [userExperience, setExperience] = useState([]);
  // const fetchedUserId = ""
  console.log("THIS IS MATCH.PARAMS", match.params.id);
  useEffect(() => {
    fetchExp();
  }, [match.params.id]);

  const fetchExp = async () => {
    try {
      let response = await fetch(
        match.params.id
          ? `${process.env.REACT_APP_FETCH_BE_URL}/profiles/` + match.params.id
          : `${process.env.REACT_APP_FETCH_BE_URL}/profiles` +
              "/6166fec751575eba24d693f5",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        let data = await response.json();
        // console.log("THIS IS DATA", data);

        let profileExperiences = data.experiences;
        // console.log("THIS IS PROFILE EXP", profileExperiences)
        setExperience(profileExperiences);
      } else {
        console.log("Error");
      }
    } catch (erorr) {}
  };

  return (
    <>
      <div className="experience-container mt-3">
        <div className="text-left ml-4 mr-4 mt-4 mb-3">
          <div className="text-left mt-4 mb-3 d-flex">
            <h5 style={{ fontWeight: "480" }}>Experience</h5>

            <div className="d-flex ml-auto">
              <AddExperience
                userId={match.params.id || "6166fec751575eba24d693f5"}
                fetchExp={fetchExp}
              />
            </div>
          </div>
          {userExperience.map((exp) => (
            <div className="mt-2">
              <Row>
                <Col xs="1">
                  {!exp.image ? (
                    <div></div>
                  ) : (
                    <img className="image" src={exp.image} alt="" />
                  )}
                </Col>
                <Col xs="11">
                  <div className="ml-4">
                    <div
                      className="text-left d-flex"
                      style={{ height: "15px" }}
                    >
                      <h6 className="my-0 py-0"> {exp.role} </h6>
                      <div className="d-flex ml-auto">
                        <EditExperience
                          userId={exp.user}
                          expId={exp._id}
                          arrayLenth={userExperience.length}
                          fetchExp={fetchExp}
                        />
                      </div>
                    </div>
                    <Link>
                      <div className="text-left company"> {exp.company}</div>
                      {!exp.endDate ? (
                        <div className="lighter-color text-left my-0 py-0 date">
                          {format(parseISO(exp.startDate), "MMM yyyy")} -{" "}
                        </div>
                      ) : (
                        <div className="lighter-color text-left my-0 py-0 date">
                          {format(parseISO(exp.startDate), "MMM yyyy")} -{" "}
                          {format(parseISO(exp.endDate), "MMM yyyy")}
                        </div>
                      )}
                      <div className="lighter-color text-left my-0 py-0 area">
                        {exp.area}{" "}
                      </div>
                    </Link>
                    <div className="text-left">
                      <p style={{ fontSize: "15px" }}>{exp.description}</p>
                    </div>
                    <hr />
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default withRouter(Experience);

import React from "react";
import  primavera from "../Images/primavera.jpg";
import  verano from "../Images/verano.jpg";
import  otonio from "../Images/otonio.jpg";
import  invierno from "../Images/invierno.jpg";
import  "./CardActivities.css";

function CardActivity({ activities }) {

  return (
    <>
      {activities?.map((e) => {
        //console.log(activities)
        let imgSrc;
        if( e.season === 'Spring') imgSrc = primavera;
        if( e.season === 'Summer') imgSrc = verano;
        if( e.season === 'Autumn') imgSrc = otonio;
        if( e.season === 'Winter') imgSrc = invierno;

        function getDuration(duration) {
          const [hours, minutes] = duration.split(":");
          if (hours === "00") {
            return `${minutes} mins.`;
          } else {
            return `${hours}:${minutes} hrs.`;
          }
        }

        return (
          <div className="container-all-activity" key={e.id}>
          <div className= "activity-card" key={e.id}>
            <h3 className="name-activity">Activity: {e.name}</h3>
            <h3 className="difficulty-activity">Difficulty: {e.difficulty}</h3>
            <h3 className="duration-activity">Duration: {getDuration(e.duration)}</h3>
            <h3 className="season-activity">Season: {e.season}</h3>
          </div>
          <div>
          <img className="image-activity" src={imgSrc} alt={e.name}></img>
          </div>
          </div>
        );
      })}
    </>
  );
}
export default CardActivity;

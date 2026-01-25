import { Link } from "react-router-dom";

const Mentor = ({ mentors }) => {
  console.log(mentors);
  if (!mentors) return <h1>Loading</h1>;
  return (
    <>
      <h1>Level: {mentors.level} </h1>
      <p>Name: {mentors.levelName}</p>
      <p>Points: {mentors.points}</p>
      <p>Mentor Says: {mentors.mentorMessage}</p>
      {mentors.recentTransactions ? (
        <div>
          <p>Recent Transactions:</p>
          {mentors?.recentTransactions.map((t) => {
            
            return (
              <div key={t._id}>
                <p>{t.amount}</p>
            
                <p>{t.description}</p>
                <p>Type: {t.type}</p>
                 <p>Created: {t.date.slice(0, 10)}</p>
                <p>Updated: {t.updatedAt.slice(0, 10)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Transactions</p>
      )}
    </>
  );
};

export default Mentor;

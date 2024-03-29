import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NestedDropdown.css'; 

const NestedDropdown = ({ data }) => {
  const [visibleOpponents, setVisibleOpponents] = useState({});
  const [visibleFilmGroups, setVisibleFilmGroups] = useState({});

  const toggleOpponents = (seasonName) => {
    setVisibleOpponents(prev => ({ ...prev, [seasonName]: !prev[seasonName] }));
    if (!visibleOpponents[seasonName]) {
      setVisibleFilmGroups({});
    }
  };

  const toggleFilmGroups = (seasonName, opponentName) => {
    const key = `${seasonName}-${opponentName}`;
    setVisibleFilmGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dropdown-container">
      <h1>Select an Option</h1>
      
      {data.map((season) => (
        <div key={season.season_name}>
          
          <button className="season-button" onClick={() => toggleOpponents(season.season_name)}>
            {visibleOpponents[season.season_name] ? '[-] ' : '[+] '}
            {season.season_name}
          </button>

          {visibleOpponents[season.season_name] && (
            <div className="opponent-container">
              {season.opponents.map((opponent) => (
                <div key={opponent.opponent_name || opponent.game_name}>
                  
                  <button className="opponent-button" onClick={() => toggleFilmGroups(season.season_name, opponent.opponent_name || opponent.game_name)}>
                    {visibleFilmGroups[`${season.season_name}-${opponent.opponent_name || opponent.game_name}`] ? '[-] ' : '[+] '}
                    {opponent.opponent_name || opponent.game_name}
                  </button>

                  {visibleFilmGroups[`${season.season_name}-${opponent.opponent_name || opponent.game_name}`] && (
                    <ul className="film-group-list">
                      {opponent.film_group.map((group, index) => (
                        <li key={index} className="film-group-item">{group}</li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

NestedDropdown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      season_name: PropTypes.string.isRequired,
      opponents: PropTypes.arrayOf(
        PropTypes.shape({
          opponent_name: PropTypes.string,
          game_name: PropTypes.string,
          film_group: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default NestedDropdown;



// // import React, { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types'; // Optional, but recommended for prop validation

// // const NestedDropdown = ({ data }) => {
// //   const [selectedSeason, setSelectedSeason] = useState('');
// //   const [selectedOpponent, setSelectedOpponent] = useState('');
// //   const [filmGroups, setFilmGroups] = useState([]);

// //   const [mydata, setmydata] = useState(data);

// //   useEffect(() => {
// //     console.log("here");

// //   }, []);

// //   const handleSeasonChange = (e) => {
// //     const season = data.find(season => season.season_name === e.target.value);
// //     setSelectedSeason(e.target.value);
// //     setSelectedOpponent('');
// //     setFilmGroups([]);
// //   };

// //   const handleOpponentChange = (e) => {
// //     const season = data.find(season => season.season_name === selectedSeason);
// //     const opponent = season.opponents.find(opponent => opponent.opponent_name === e.target.value);
// //     setSelectedOpponent(e.target.value);
// //     setFilmGroups(opponent ? opponent.film_group : []);
// //   };

// //   return (
// //     <div>
// //       <select value={selectedSeason} onChange={handleSeasonChange}>
// //         <option value="">Select Season</option>
// //         {data.map((season) => (
// //           <option key={season.season_name} value={season.season_name}>{season.season_name}</option>
// //         ))}
// //       </select>

// //       {selectedSeason && (
// //         <select value={selectedOpponent} onChange={handleOpponentChange}>
// //           <option value="">Select Opponent</option>
// //           {data.find(season => season.season_name === selectedSeason).opponents.map((opponent) => (
// //             <option key={opponent.opponent_name} value={opponent.opponent_name}>{opponent.opponent_name}</option>
// //           ))}
// //         </select>
// //       )}

// //       {selectedOpponent && (
// //         <select>
// //           <option value="">Select Film Group</option>
// //           {filmGroups.map((group, index) => (
// //             <option key={index} value={group}>{group}</option>
// //           ))}
// //         </select>
// //       )}

// //     </div>
// //   );
// // };

// // // Prop types validation (optional but recommended)
// // NestedDropdown.propTypes = {
// //   data: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       season_name: PropTypes.string.isRequired,
// //       opponents: PropTypes.arrayOf(
// //         PropTypes.shape({
// //           opponent_name: PropTypes.string.isRequired,
// //           film_group: PropTypes.arrayOf(PropTypes.string).isRequired,
// //         })
// //       ).isRequired,
// //     })
// //   ).isRequired,
// // };

// // export default NestedDropdown;


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// const NestedDropdown = ({ data }) => {
//   const [selectedSeason, setSelectedSeason] = useState('');
//   const [selectedOpponent, setSelectedOpponent] = useState('');
//   const [filmGroups, setFilmGroups] = useState([]);

//   const handleSeasonChange = (e) => {
//     const season = data.find(season => season.season_name === e.target.value);
//     setSelectedSeason(e.target.value);
//     setSelectedOpponent('');
//     setFilmGroups([]);
//   };

//   const handleOpponentChange = (e) => {
//     const season = data.find(season => season.season_name === selectedSeason);
//     if (season) {
//       const opponent = season.opponents.find(op => op.opponent_name === e.target.value || op.game_name === e.target.value);
//       setSelectedOpponent(e.target.value);
//       setFilmGroups(opponent ? opponent.film_group : []);
//     }
//   };

//   return (
//     <div className="dropdown-container">
//       <div className="dropdown">
//         <select value={selectedSeason} onChange={handleSeasonChange}>
//           <option value="">Select Season</option>
//           {data.map((season) => (
//             <option key={season.season_name} value={season.season_name}>{season.season_name}</option>
//           ))}
//         </select>
//       </div>
//       {selectedSeason && (
//         <div className="dropdown">
//           <select value={selectedOpponent} onChange={handleOpponentChange}>
//             <option value="">Select Opponent</option>
//             {data.find(season => season.season_name === selectedSeason)?.opponents.map((opponent) => (
//               <option key={opponent.opponent_name || opponent.game_name} value={opponent.opponent_name || opponent.game_name}>
//                 {opponent.opponent_name || opponent.game_name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       {selectedOpponent && (
//         <div className="dropdown">
//           <select>
//             <option value="">Select Film Group</option>
//             {filmGroups.map((group, index) => (
//               <option key={index} value={group}>{group}</option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// NestedDropdown.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       season_name: PropTypes.string.isRequired,
//       opponents: PropTypes.arrayOf(
//         PropTypes.shape({
//           opponent_name: PropTypes.string,
//           game_name: PropTypes.string,
//           film_group: PropTypes.arrayOf(PropTypes.string).isRequired,
//         })
//       ).isRequired,
//     })
//   ).isRequired,
// };

// export default NestedDropdown;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './NestedDropdown.css';

// const NestedDropdown = ({ data }) => {
//   const [visibleOpponents, setVisibleOpponents] = useState({});
//   const [visibleFilmGroups, setVisibleFilmGroups] = useState({});

//   const toggleOpponents = (seasonName) => {
//     setVisibleOpponents(prev => ({ ...prev, [seasonName]: !prev[seasonName] }));
//     // Hide film groups if we are collapsing the opponents list
//     if (visibleOpponents[seasonName]) {
//       setVisibleFilmGroups({});
//     }
//   };

//   const toggleFilmGroups = (seasonName, opponentName) => {
//     const key = `${seasonName}-${opponentName}`;
//     setVisibleFilmGroups(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="dropdown-container">
//       {data.map((season) => (
//         <div key={season.season_name}>
//           <button onClick={() => toggleOpponents(season.season_name)}>
//             {season.season_name}
//           </button>
//           {visibleOpponents[season.season_name] && (
//             <div>
//               {season.opponents.map((opponent) => (
//                 <div key={opponent.opponent_name || opponent.game_name}>
//                   <button onClick={() => toggleFilmGroups(season.season_name, opponent.opponent_name || opponent.game_name)}>
//                     {opponent.opponent_name || opponent.game_name}
//                   </button>
//                   {visibleFilmGroups[`${season.season_name}-${opponent.opponent_name || opponent.game_name}`] && (
//                     <ul>
//                       {opponent.film_group.map((group, index) => (
//                         <li key={index}>{group}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// NestedDropdown.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       season_name: PropTypes.string.isRequired,
//       opponents: PropTypes.arrayOf(
//         PropTypes.shape({
//           opponent_name: PropTypes.string,
//           game_name: PropTypes.string,
//           film_group: PropTypes.arrayOf(PropTypes.string).isRequired,
//         })
//       ).isRequired,
//     })
//   ).isRequired,
// };

// export default NestedDropdown;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './NestedDropdown.css'; // Ensure you're importing your CSS file correctly

// const NestedDropdown = ({ data }) => {
//   const [visibleOpponents, setVisibleOpponents] = useState({});
//   const [visibleFilmGroups, setVisibleFilmGroups] = useState({});

//   const toggleOpponents = (seasonName) => {
//     setVisibleOpponents(prev => ({ ...prev, [seasonName]: !prev[seasonName] }));
//     if (visibleOpponents[seasonName]) {
//       setVisibleFilmGroups({});
//     }
//   };

//   const toggleFilmGroups = (seasonName, opponentName) => {
//     const key = `${seasonName}-${opponentName}`;
//     setVisibleFilmGroups(prev => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <div className="dropdown-container">
//       {data.map((season) => (
//         <div key={season.season_name}>
//           <button className="season-button" onClick={() => toggleOpponents(season.season_name)}>
//             {season.season_name}
//           </button>
//           {visibleOpponents[season.season_name] && (
//             <div className="opponent-container">
//               {season.opponents.map((opponent) => (
//                 <div key={opponent.opponent_name || opponent.game_name}>
//                   <button className="opponent-button" onClick={() => toggleFilmGroups(season.season_name, opponent.opponent_name || opponent.game_name)}>
//                     {opponent.opponent_name || opponent.game_name}
//                   </button>
//                   {visibleFilmGroups[`${season.season_name}-${opponent.opponent_name || opponent.game_name}`] && (
//                     <ul className="film-group-list">
//                       {opponent.film_group.map((group, index) => (
//                         <li key={index} className="film-group-item">{group}</li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// NestedDropdown.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       season_name: PropTypes.string.isRequired,
//       opponents: PropTypes.arrayOf(
//         PropTypes.shape({
//           opponent_name: PropTypes.string,
//           game_name: PropTypes.string,
//           film_group: PropTypes.arrayOf(PropTypes.string).isRequired,
//         })
//       ).isRequired,
//     })
//   ).isRequired,
// };

// export default NestedDropdown;
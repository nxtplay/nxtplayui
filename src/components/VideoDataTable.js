import React, { useState } from 'react';
import './VideoDataTable.css'; 

const VideoDataTable = ({ data, onRowSelected }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });
  const [selectedRowId, setSelectedRowId] = useState(null);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'forward' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'forward' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'forward';
    if ( sortConfig.key === key && sortConfig.direction === 'forward' ) {
      direction = 'backward';
    } else {
      direction = 'forward';
    }
    setSortConfig({ key, direction });
  };

  // Adjusted handler for row click to use row's unique identifier
  const handleRowClick = (id, rowData) => {
    setSelectedRowId(id); // Update state to reflect the selected row by its ID
    if (onRowSelected) {
      onRowSelected(rowData); // If there's a function passed as a prop, call it with the row data
    }
    console.log(rowData);
  };

  return (
    <table className="video-data-table">
      <thead>
        <tr className="table-header">
          {headers.map((header) => (
            <th
              key={header}
              className="header-cell"
              onClick={() => requestSort(header)}
              data-sort={sortConfig.key === header ? sortConfig.direction : ''}
            >
              {header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr 
            key={item.id} 
            className={`data-row ${item.id === selectedRowId ? 'selected-row' : ''}`}
            onClick={() => handleRowClick(item.id, item)} 
          >
            {headers.map((header) => (
              <td key={`${item.id}-${header}`} className="data-cell">{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VideoDataTable;



// Old ChatGPT generations

// import React, { useState, useEffect } from 'react';
// import "./VideoDataTable.css";

// const VideoDataTable = ({ data }) => {
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });
  
//     const sortedData = React.useMemo(() => {
//       let sortableItems = [...data];
//       if (sortConfig.key !== null) {
//         sortableItems.sort((a, b) => {
//           if (a[sortConfig.key] < b[sortConfig.key]) {
//             return sortConfig.direction === 'forward' ? -1 : 1;
//           }
//           if (a[sortConfig.key] > b[sortConfig.key]) {
//             return sortConfig.direction === 'forward' ? 1 : -1;
//           }
//           return 0;
//         });
//       }
//       return sortableItems;
//     }, [data, sortConfig]);
  
//     const requestSort = (key) => {
//       let direction = 'forward';
//       if (
//         sortConfig.key === key &&
//         sortConfig.direction === 'forward'
//       ) {
//         direction = 'backward';
//       }
//       setSortConfig({ key, direction });
//     };
  
//     return (
//       <table>
//         <thead>
//           <tr>
            // <th onClick={() => requestSort('value1')}>
            //     Value 1 {sortConfig.key === 'value1' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
            // </th>
            // <th onClick={() => requestSort('value2')}>
            //     Value 2 {sortConfig.key === 'value2' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
            // </th>
            // <th onClick={() => requestSort('value3')}>
            //     Value 3 {sortConfig.key === 'value3' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
            // </th>
            // <th onClick={() => requestSort('value4')}>
            //     Value 4 {sortConfig.key === 'value4' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
            // </th>
            // <th onClick={() => requestSort('value5')}>
            //     Value 5 {sortConfig.key === 'value5' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
            // </th>
//           </tr>
//         </thead>
        // <tbody>
        //   {sortedData.map((item, index) => (
        //     <tr key={index}>
        //       <td>{item.value1}</td>
        //       <td>{item.value2}</td>
        //       <td>{item.value3}</td>
        //       <td>{item.value4}</td>
        //       <td>{item.value5}</td>
        //     </tr>
        //   ))}
        // </tbody>
//       </table>
//     );
//   };

// export default VideoDataTable;

// import React, { useState } from 'react';
// import './VideoDataTable.css'; // Ensure you have this CSS file in your project

// const VideoDataTable = ({ data }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'forward';
//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'forward'
//     ) {
//       direction = 'backward';
//     }
//     setSortConfig({ key, direction });
//   };

//   return (
//     <table className="video-data-table">
//       <thead>
//         <tr className="table-header">
//             <th className="header-cell" onClick={() => requestSort('value1')}>
//                 Value 1 {sortConfig.key === 'value1' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//             <th className="header-cell" onClick={() => requestSort('value2')}>
//                 Value 2 {sortConfig.key === 'value2' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//             <th className="header-cell" onClick={() => requestSort('value3')}>
//                 Value 3 {sortConfig.key === 'value3' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//             <th className="header-cell" onClick={() => requestSort('value4')}>
//                 Value 4 {sortConfig.key === 'value4' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//             <th className="header-cell" onClick={() => requestSort('value5')}>
//                 Value 5 {sortConfig.key === 'value5' ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//         </tr>
//       </thead>
//       <tbody>
//           {sortedData.map((item, index) => (
//             <tr key={index}>
//               <td className="data-cell">{item.value1}</td>
//               <td className="data-cell">{item.value2}</td>
//               <td className="data-cell">{item.value3}</td>
//               <td className="data-cell">{item.value4}</td>
//               <td className="data-cell">{item.value5}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// };

// export default VideoDataTable;


// import React, { useState } from 'react';
// import './VideoDataTable.css'; // Ensure you have this CSS file in your project

// const VideoDataTable = ({ data }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'forward';
//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'forward'
//     ) {
//       direction = 'backward';
//     }
//     setSortConfig({ key, direction });
//   };

//   return (
//     <table className="video-data-table">
//       <thead>
//         <tr className="table-header">
//           {['value1', 'value2', 'value3', 'value4', 'value5'].map((value, index) => (
//             <th key={index} className="header-cell" onClick={() => requestSort(value)}>
//               {value.toUpperCase().replace(/VALUE(\d)/, 'Value $1')} {sortConfig.key === value ? (sortConfig.direction === 'forward' ? '↓' : '↑') : ''}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((item, index) => (
//           <tr key={index} className="data-row">
//             <td className="data-cell">{item.value1}</td>
//             <td className="data-cell">{item.value2}</td>
//             <td className="data-cell">{item.value3}</td>
//             <td className="data-cell">{item.value4}</td>
//             <td className="data-cell">{item.value5}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default VideoDataTable;

// import React, { useState } from 'react';
// import './VideoDataTable.css'; // Ensure the CSS file is correctly imported

// const VideoDataTable = ({ data }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'forward';
//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'forward'
//     ) {
//       direction = 'backward';
//     } else {
//       direction = 'forward';
//     }
//     setSortConfig({ key, direction });
//   };

//   return (
//     <table className="video-data-table">
//       <thead>
//         <tr className="table-header">
//           {['value1', 'value2', 'value3', 'value4', 'value5'].map((value) => (
//             <th
//               key={value}
//               className="header-cell"
//               onClick={() => requestSort(value)}
//               data-sort={sortConfig.key === value ? sortConfig.direction : ''}
//             >
//               {value.toUpperCase().replace(/VALUE(\d)/, 'Value $1')}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((item, index) => (
//           <tr key={index} className="data-row">
//             <td className="data-cell">{item.value1}</td>
//             <td className="data-cell">{item.value2}</td>
//             <td className="data-cell">{item.value3}</td>
//             <td className="data-cell">{item.value4}</td>
//             <td className="data-cell">{item.value5}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default VideoDataTable;

// import React, { useState } from 'react';
// import './VideoDataTable.css'; // Ensure the CSS file is correctly imported

// const VideoDataTable = ({ data }) => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });

//   // Assuming all objects in the array have the same structure
//   const headers = data.length > 0 ? Object.keys(data[0]) : [];

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'forward';
//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'forward'
//     ) {
//       direction = 'backward';
//     } else {
//       direction = 'forward';
//     }
//     setSortConfig({ key, direction });
//   };

//   return (
//     <table className="video-data-table">
//       <thead>
//         <tr className="table-header">
//           {headers.map((header) => (
//             <th
//               key={header}
//               className="header-cell"
//               onClick={() => requestSort(header)}
//               data-sort={sortConfig.key === header ? sortConfig.direction : ''}
//             >
//               {header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ')}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((item, index) => (
//           <tr key={index} className="data-row">
//             {headers.map((header) => (
//               <td key={header} className="data-cell">{item[header]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default VideoDataTable;





// import React, { useState } from 'react';
// import './VideoDataTable.css'; // Ensure the CSS file is correctly imported

// const VideoDataTable = ({ data, onRowSelected }) => { // Added onRowSelected as an example prop for handling row click
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'forward' });
//   const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track the selected row
  
//   const headers = data.length > 0 ? Object.keys(data[0]) : [];

//   const sortedData = React.useMemo(() => {
//     let sortableItems = [...data];
//     if (sortConfig.key !== null) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'forward' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [data, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'forward';
//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'forward'
//     ) {
//       direction = 'backward';
//     } else {
//       direction = 'forward';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Handler for row click
//   const handleRowClick = (index, rowData) => {
//     setSelectedRowIndex(index); // Update state to reflect the selected row
//     if (onRowSelected) {
//       onRowSelected(rowData); // If there's a function passed as a prop, call it with the row data
//     }
//     console.log(rowData);
//   };

//   return (
//     <table className="video-data-table">
//       <thead>
//         <tr className="table-header">
//           {headers.map((header) => (
//             <th
//               key={header}
//               className="header-cell"
//               onClick={() => requestSort(header)}
//               data-sort={sortConfig.key === header ? sortConfig.direction : ''}
//             >
//               {header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ')}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((item, index) => (
//           <tr 
//             key={index} 
//             className={`data-row ${index === selectedRowIndex ? 'selected-row' : ''}`} // Apply the 'selected-row' class to the selected row
//             onClick={() => handleRowClick(index, item)} // Set click handler
//           >
//             {headers.map((header) => (
//               <td key={header} className="data-cell">{item[header]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default VideoDataTable;



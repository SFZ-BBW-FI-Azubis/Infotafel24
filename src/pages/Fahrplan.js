import React from "react";
import busIcon from "../assets/busplan/bus.svg";

function Fahrplan() {
  return (
    <div className=" bg-site-background mx-auto px-4 text-white flex-grow w-screen">
      <div className="p-4 flex justify-center items-center">
        <img src={busIcon} alt="Image" className="absolute top-0 left-0" />
        <table className="w-full table-auto border-2 border-white mx-auto">
          <thead>
            <tr>
              <th className="text-left px-4 py-2 border border-white font-bold text-xl">
                Buslinie
              </th>
              <th className="text-left px-4 py-2 border border-white font-bold text-xl">
                Abfahrt
              </th>
              <th className="text-left px-4 py-2 border border-white font-bold text-xl">
                Relevante Haltestellen
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left px-4 py-2 border border-white table-cell">
                31
              </td>
              <td className="text-left px-4 py-2 border border-white table-cell">
                10 Minuten Takt
              </td>
              <td className="text-left px-4 py-2 border border-white table-cell">
                Klinikum Flemming, Zentralhaltestelle, Hbf Dresdner Straße,
                Yorckgebiet
              </td>
            </tr>
            <tr>
              <td className="text-left px-4 py-2 border border-white table-cell">
                62
              </td>
              <td className="text-left px-4 py-2 border border-white table-cell">
                20 Minuten Takt
              </td>
              <td className="text-left px-4 py-2 border border-white table-cell">
                Zentralhaltestelle, Zschopauerstraße, Gablenz
              </td>
            </tr>
            {/* Add more bus lines here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Client-ID: c5d00d2da7ea66323cb17de1fd3a2053
// API-Key: 81e30275fc35111e76c1163d1f15868e

export default Fahrplan;

import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Hotlines = ({ numbersInfo }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/hotlines")
      .then((res) => res.json())
      .then((data) => {
        setNumbers(data);
      });
  }, []);

  return (
    <div className="px-3" style={{ backgroundColor: "#E5E5E5" }}>
      <br />
      {/* load hotlines in table */}
      <div
        className="mt-5 mb-5 container mx-auto rounded-box px-5"
        style={{ backgroundColor: "#FFFFFF" }}  >
        <div className="overflow-x-auto px-4">
          <Table>
            {/* table head */}
            <Table.Head className="bg-base-content "  >
              <Table.HeadCell> # </Table.HeadCell>
              <Table.HeadCell> Weblink </Table.HeadCell>
              <Table.HeadCell> Hotline Number </Table.HeadCell>
              <Table.HeadCell> Details </Table.HeadCell>
            </Table.Head>

            {numbers.map((numberInfo, index) => (
              <Table.Body className="divide-y" key={numberInfo._id}>
                
                <Table.Row className="bg-white hover dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell> {index + 1} </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <a href={numberInfo.weblink} target="_blank">
                      {numberInfo.weblink}
                    </a>{" "}
                  </Table.Cell>
                  <Table.Cell> {numberInfo.hotline} </Table.Cell>
                  <Table.Cell> {numberInfo.details} </Table.Cell>
                </Table.Row>

              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Hotlines;

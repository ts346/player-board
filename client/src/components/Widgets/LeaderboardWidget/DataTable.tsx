import React, { useRef } from "react";
import { dataTableProps } from "../../../types/leaderboardTypes";
import tokenData from "./tokenData";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import "../../css/Widget.css";

const DataTable = (props: dataTableProps) => {
  const input = useRef<string>("");

  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="a dense table"
        className="leaderboard-table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" variant="body" size="small">
              <TextField
                id="address"
                color="primary"
                label="address"
                variant="outlined"
                margin="dense"
                onChange={(e) => (input.current = e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell align="center" variant="body" size="small">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  props.setAddress(input.current);
                }}
              >
                Retrieve
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>
                Adventure Tokens for {props.address.slice(0, 18)}...
              </strong>
            </TableCell>
            <TableCell align="center">
              <strong>Bag</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(tokenData).map((token, index: number) => (
            <TableRow key={tokenData[index].ticker}>
              <TableCell align="left">
                <a
                  href={tokenData[index].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tokenData[index].ticker}
                </a>
              </TableCell>
              <TableCell align="center">
                {props.tokenBalance[index] || "0"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

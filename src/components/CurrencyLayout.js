import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import loader from "../asset/805.gif";

function CurrencyLayout(props) {
  const [Mycurrency, setCurrency] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useState(async () => {
    try {
      const resp = await axios.get(
        "https://cors-anywhere.herokuapp.com/" +
          "https://v2.api.forex/rates/latest.json?from=INR&key=4f02eef1-58e8-4810-88a4-f0cfe078bc71",
        {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
          },
        }
      );
      console.log(resp.data.rates);
      // Object.entries(resp.data.rates);
      setCurrency(Object.entries(resp.data.rates));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper
      color="transparent"
      elevation={5}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img src={loader} alt="Loader" />
          <p>{error}</p>
        </div>
      ) : (
        //   {
        //       Mycurrency.map((item,i) => (
        //           <p>{ i}</p>
        //   ))}
        <TableContainer>
          <Table aria-label="caption table">
            <caption>Current currency rate.</caption>
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Mycurrency.slice(1, 5).map((row, i) => (
                <TableRow key={i}>
                  {row.map((data, j) => (
                    <>
                      <TableCell key={j}>{data}</TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.weather.currency,
    loadingCurrency: state.weather.loadingCurrency,
  };
};

export default connect(mapStateToProps, null)(CurrencyLayout);

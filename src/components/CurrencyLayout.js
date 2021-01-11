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
  var dragSrcEl;
  const [Mycurrency, setCurrency] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const rowItem = [];
  var indexitem;
  const TableRef = React.useRef(null);
  // console.log(rowItem);
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

  function handleDragStart(e, value) {
    // Target (this) element is the source node.
    console.log(value.current.outerHTML);
    console.log(e);
    dragSrcEl = value.current;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", value.current.outerHTML);

    // value.current.classList.add("dragElem");
  }

  function handleDragOver(e, i) {
    // console.log(value);
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    indexitem = i;
    console.log(i);
    e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.

    return false;
  }

  function handleDrop(e, value) {
    // this/e.target is current target element.
    console.log("drop");

    console.log(dragSrcEl);
    console.log(value.current);

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl !== value.current) {
      console.log("in loop");
      console.log(TableRef.current.childNodes);
      var dropHTML = e.dataTransfer.getData("text/html");
      value.current.insertAdjacentHTML("beforebegin", dropHTML);
      e.dataTransfer.setData("text/html", null);
      // TableRef.current.removeChild(TableRef.current.childNodes[indexitem]);
    }

    return false;
  }

  // function addDnDHandlers(e,elem) {
  //   elem.addEventListener("dragstart", handleDragStart(e,elem), false);
  //   elem.addEventListener("dragover", handleDragOver(e, elem), false);
  //   elem.addEventListener("drop", handleDrop(e, elem), false);
  // }

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
          <p>{error}, PLEASE REFRESH</p>
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
                <TableCell></TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={TableRef}>
              {Mycurrency.slice(0, 5).map((row, i) => {
                const newRef = React.createRef();
                rowItem.push(newRef);
                // console.log(newRef);
                return (
                  <TableRow
                    ref={newRef}
                    // ref={(ref) => (rowItem[i] = ref)}
                    onDragStart={(e) => handleDragStart(e, rowItem[i])}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDrop={(e) => handleDrop(e, rowItem[i])}
                    draggable="true"
                    key={i}
                    id={i}
                    style={{ cursor: "move" }}
                  >
                    <TableCell>
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </TableCell>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>

                    {/* {row.map((data, j) => (
                    <>
                      <TableCell key={j}>{data}</TableCell>
                    </>
                  ))} */}
                  </TableRow>
                );
              })}
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

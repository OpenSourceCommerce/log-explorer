import React, { useEffect, useRef, useState } from "react";
import { Button, Colors, Link } from ".";
import "../../styles/component/_log_detail_sidebar.scss";

export const LogDetailSidebar = ({ item }) => {
    const offCanvasRef = useRef(null);
    const [rowDetail, setRowDetail] = useState();

    useEffect(() => {
        let rowDetail = [];
        if (item) {
            rowDetail = Object.entries(item).reduce((newArr, [key, value]) => {
                const words = key.split("_").map((item, index) => {
                    if (index === 0) {
                        return item.charAt(0).toUpperCase() + item.slice(1);
                    }

                    return item;
                });

                newArr.push({
                    label: words.join(" "),
                    value,
                });

                return newArr;
            }, []);
        }
        setRowDetail(rowDetail);
    }, [item]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, false);
        return function cleanup() {
            document.removeEventListener("mousedown", handleClickOutside, false);
        };
    });

    const handleClickOutside = (event) => {
        if (!offCanvasRef?.current?.contains(event?.target)) {
            // on Close off canvas log detail will be fire in here
        }
    };

    const copyToClipboard = (e, type) => {
        e.preventDefault();
        let content = "";

        switch (type) {
            case "csv":
                let headers = "";
                Object.entries(item).map(([key, value]) => {
                    if (headers.length > 0) {
                        headers += ",";
                    }
                    headers += `\"${key}\"`;

                    if (content.length > 0) {
                        content += ",";
                    }

                    if (isNaN(value)) {
                        content += `\"${value}\"`;
                    } else {
                        content += value;
                    }
                });
                content = headers + "\r\n" + content;
                break;
            case "json":
                content = JSON.stringify(item);
                break;
            default:
                return;
        }
        navigator.clipboard.writeText(content);
    };

    return (
        <div
            ref={offCanvasRef}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
        >
            <div className="offcanvas-header d-flex justify-content-between">
                <div className="dropdown">
                    <Button
                        color={Colors.light}
                        className="dropdown-toggle dropdown-icon btn-sm"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    ></Button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <Link
                            onClick={(e) => copyToClipboard(e, "csv")}
                            className={"dropdown-item"}
                            href={"#"}
                        >
                            Copy as CSV
                        </Link>
                        <Link
                            onClick={(e) => copyToClipboard(e, "json")}
                            className={"dropdown-item"}
                            href={"#"}
                        >
                            Copy as JSON
                        </Link>
                    </ul>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                {rowDetail &&
                    rowDetail.map((item, index) => (
                        <div key={index}>
                            <h5>{item.label}</h5>
                            <p>{item.value || "-"}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

import $ from "jquery";
import "datatables.net";
import "datatables.net-responsive";

const defaultConfig = {
  responsive: true,
  pageLength: 10,
  lengthMenu: [5, 10, 25, 50],
  language: {
    search: "Search:",
    lengthMenu: "_MENU_ entries",
    emptyTable: "No Data Found",
  },
};

export function initDataTableById(tableId, config = {}) {
  const selector = `#${tableId}`;

  if (!document.querySelector(selector)) return;

  // destroy old instance
  if ($.fn.DataTable.isDataTable(selector)) {
    $(selector).DataTable().destroy(true);
  }

  const table = document.querySelector(selector);

  if (table && table.querySelectorAll("tbody tr").length > 0) {
    $(selector).DataTable({
      ...defaultConfig,
      ...config,
    });
  }
}
    //Thời Gian
    function time() {
        var today = new Date();
        var weekday = new Array(7);
        weekday[0] = "Chủ Nhật";
        weekday[1] = "Thứ Hai";
        weekday[2] = "Thứ Ba";
        weekday[3] = "Thứ Tư";
        weekday[4] = "Thứ Năm";
        weekday[5] = "Thứ Sáu";
        weekday[6] = "Thứ Bảy";
        var day = weekday[today.getDay()];
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        // var s = today.getSeconds();
        m = checkTime(m);
        // s = checkTime(s);
        nowTime = h + " giờ " + m + " phút ";
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        today = day + ', ' + dd + '/' + mm + '/' + yyyy;
        tmp = '<span class="date"> ' + today + ' - ' + nowTime +
          '</span>';
        document.getElementById("clock").innerHTML = tmp;
        clocktime = setTimeout("time()", "1000", "Javascript");
  
        function checkTime(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
      }
  
      // Hiển thị list đơn hàng
      function renderListPay() {
        let renderOrder = JSON.parse(localStorage.getItem("renderOrder"));
        if (renderOrder == null) {
          renderOrder = [];
        }
        let listPay = JSON.parse(localStorage.getItem("listPay"));
        let grouped = {};
        listPay.forEach(item => {
          let key = `${item.username}_${item.orderID.toString().padStart(3, '0')}`;
          let order = `${item.name}- sl:${item.quantity}`;
          if (!grouped[key]) {
            grouped[key] = {
              username: item.username,
              customName: item.customName,
              orderID: key,
              name: [],
              time: item.time,
              price: 0,
              address: item.customAdd,
              telephone: item.customTel,
              status: ""
            };
          }
          grouped[key].name.push(order);
          grouped[key].price += item.price;
        });
  
        renderOrder.forEach(item => {
          let id = item.orderID;
          if (!grouped[id]) {
            grouped[id].status = "Đang xử lý";
          }
          grouped[id].status = item.status;
  
        });
        let orderManage = Object.values(grouped);
        localStorage.setItem("orderManage", JSON.stringify(orderManage));
        let ordered = `<tr>
                      <th style="text-align:center;width:3%">TT</th>
                      <th style="text-align:center;width:10%">ID đơn hàng</th>
                      <th style="text-align:center;width:8%">Tên người nhận</th>
                      <th style="text-align:center;width:20%">Đơn hàng</th>
                      <th style="text-align:center;width:8%">Tổng tiền</th>
                      <th style="text-align:center;width:8%">Thời gian</th>
                      <th style="text-align:center;width:13%">Địa chỉ</th>
                      <th style="text-align:center;width:12%">Số ĐT nhận hàng</th>
                      <th style="text-align:center;width:19%">Tình trạng</th>
                    </tr>`;
  
        for (let i = (orderManage.length - 1); i >= 0; i--) {
          // `statusSelect${i}`.value
          // console.log("TRẠNG THÁI",`statusSelect${i}`.value);
          
          let status = orderManage[i] ? orderManage[i].status : "Đang xử lý"; // Lấy giá trị status từ renderOrder
          ordered += `<tr>
                      <td style="text-align:center">${orderManage.length - i}</td>
                      <td>${orderManage[i].orderID}</td>
                      <td>${orderManage[i].customName}</td>
                      <td>${orderManage[i].name}</td>
                      <td style="text-align:right">${orderManage[i].price.toLocaleString('en-US')}</td>
                      <td>${orderManage[i].time}</td>
                      <td>${orderManage[i].address}</td>
                      <td>${orderManage[i].telephone}</td>
                    <td>
                      <select class="form-control" id="statusSelect${i}">
                        <option ${status === "Đang xử lý" ? "selected" : ""} value="Đang xử lý" >Đang xử lý</option>
                        <option ${status === "Đang vận chuyển" ? "selected" : ""} value="Đang vận chuyển">Đang vận chuyển</option>
                        <option ${status === "Đã hoàn thành" ? "selected" : ""} value="Đã hoàn thành" >Đã hoàn thành</option>
                        <option ${status === "Bị huỷ" ? "selected" : ""} value="Bị huỷ" >Bị huỷ</option>
                      </select>
                    </td>
                  </tr>`;
        }
        document.getElementById("renderOrder").innerHTML = ordered;
        let result = "";
        for (let i = 0; i < orderManage.length; i++) {
          let statusSelect = document.getElementById(`statusSelect${i}`);
          statusSelect.value = orderManage[i] && orderManage[i].status !== "" ? orderManage[i].status : "Đang xử lý";
          statusSelect.addEventListener("change", () => {
            let statusNew = statusSelect.value;
            orderManage[i].status = statusNew;
            localStorage.setItem("renderOrder", JSON.stringify(orderManage));
          });
        }
  
      }
      renderListPay()
  
  
      // Tìm kiếm đơn hàng
      function searchButton() {
        let renderOrder = JSON.parse(localStorage.getItem("renderOrder"));
        let searchValue = document.getElementById("searchOrder").value;
        if (searchValue == "") {
          document.getElementById("searchResult").innerHTML = `
          <tr><td colspan='10'>Hãy nhập thông tin vào ô tìm kiếm</td></tr>
          `;
          return;
        }
  
        let foundOrder = false;
        let total = `<tr>
                      <th style="text-align:center;width:3%">TT</th>
                      <th style="text-align:center;width:10%">ID đơn hàng</th>
                      <th style="text-align:center;width:10%">Tên khách hàng</th>
                      <th style="text-align:center;width:23%">Đơn hàng</th>
                      <th style="text-align:center;width:8%">Tổng tiền</th>
                      <th style="text-align:center;width:15%">Địa chỉ</th>
                      <th style="text-align:center;width:12%">Số ĐT nhận hàng</th>
                      <th style="text-align:center;width:19%">Tình trạng</th>
                    </tr>`;
        for (let i = (renderOrder.length - 1); i >= 0; i--) {
          if (renderOrder[i].username.toLowerCase().includes(searchValue.toLowerCase()) ||
            renderOrder[i].status.toLowerCase().includes(searchValue.toLowerCase()) ||
            renderOrder[i].orderID.toLowerCase().includes(searchValue.toLowerCase())) {
              let status = renderOrder[i] ? renderOrder[i].status : "Đang xử lý"; // Lấy giá trị status từ renderOrder
  
            total += `
            <tr>
                      <td style="text-align:center">${renderOrder.length - i}</td>
                      <td>${renderOrder[i].orderID}</td>
                      <td>${renderOrder[i].username}</td>
                      <td>${renderOrder[i].name}</td>
                      <td style="text-align:right">${renderOrder[i].price.toLocaleString('en-US')}</td>
                      <td>${renderOrder[i].address}</td>
                      <td>${renderOrder[i].telephone}</td>
                    <td>
                      <select class="form-control" id="statusSelect${i}">
                        <option ${status === "Đang xử lý" ? "selected" : ""} value="Đang xử lý" >Đang xử lý</option>
                        <option ${status === "Đang vận chuyển" ? "selected" : ""} value="Đang vận chuyển">Đang vận chuyển</option>
                        <option ${status === "Đã hoàn thành" ? "selected" : ""} value="Đã hoàn thành" >Đã hoàn thành</option>
                        <option ${status === "Bị huỷ" ? "selected" : ""} value="Bị huỷ" >Bị huỷ</option>
                      </select>
                    </td>
                  </tr>`;
            foundOrder = true;
          }
        }
  
        if (!foundOrder) {
          document.getElementById("searchResult").innerHTML =
            "<tr><td colspan='10'>Không có kết quả phù hợp</td></tr>";
        }
        else {
          document.getElementById("searchResult").innerHTML = total;
          let result = "";
        for (let i = 0; i < renderOrder.length; i++) {
          let statusSelect = document.getElementById(`statusSelect${i}`);
          statusSelect.value = renderOrder[i] ? renderOrder[i].status : "Đang xử lý";
          statusSelect.addEventListener("change", () => {
            let statusNew = statusSelect.value;
            renderOrder[i].status = statusNew;
            localStorage.setItem("renderOrder", JSON.stringify(renderOrder));
          });
        }
  
  
        }
  
      }
  
  
      export function renderListPay() {
        let renderOrder = JSON.parse(localStorage.getItem("renderOrder"));
        if (renderOrder == null) {
          renderOrder = [];
        }
        let listPay = JSON.parse(localStorage.getItem("listPay"));
        let grouped = {};
        listPay.forEach(item => {
          let key = `${item.username}_${item.orderID.toString().padStart(3, '0')}`;
          let order = `${item.name}- sl:${item.quantity}`;
          if (!grouped[key]) {
            grouped[key] = {
              username: item.username,
              customName: item.customName,
              orderID: key,
              name: [],
              time: item.time,
              price: 0,
              address: item.customAdd,
              telephone: item.customTel,
              status: ""
            };
          }
          grouped[key].name.push(order);
          grouped[key].price += item.price;
        });
  
        renderOrder.forEach(item => {
          let id = item.orderID;
          if (!grouped[id]) {
            grouped[id].status = "Đang xử lý";
          }
          grouped[id].status = item.status;
  
        });
        let orderManage = Object.values(grouped);
        localStorage.setItem("orderManage", JSON.stringify(orderManage));
        let ordered = `<tr>
                      <th style="text-align:center;width:3%">TT</th>
                      <th style="text-align:center;width:10%">ID đơn hàng</th>
                      <th style="text-align:center;width:8%">Tên người nhận</th>
                      <th style="text-align:center;width:20%">Đơn hàng</th>
                      <th style="text-align:center;width:8%">Tổng tiền</th>
                      <th style="text-align:center;width:8%">Thời gian</th>
                      <th style="text-align:center;width:13%">Địa chỉ</th>
                      <th style="text-align:center;width:12%">Số ĐT nhận hàng</th>
                      <th style="text-align:center;width:19%">Tình trạng</th>
                    </tr>`;
  
        for (let i = (orderManage.length - 1); i >= 0; i--) {
          // `statusSelect${i}`.value
          // console.log("TRẠNG THÁI",`statusSelect${i}`.value);
          
          let status = orderManage[i] ? orderManage[i].status : "Đang xử lý"; // Lấy giá trị status từ renderOrder
          ordered += `<tr>
                      <td style="text-align:center">${orderManage.length - i}</td>
                      <td>${orderManage[i].orderID}</td>
                      <td>${orderManage[i].customName}</td>
                      <td>${orderManage[i].name}</td>
                      <td style="text-align:right">${orderManage[i].price.toLocaleString('en-US')}</td>
                      <td>${orderManage[i].time}</td>
                      <td>${orderManage[i].address}</td>
                      <td>${orderManage[i].telephone}</td>
                    <td>
                      <select class="form-control" id="statusSelect${i}">
                        <option ${status === "Đang xử lý" ? "selected" : ""} value="Đang xử lý" >Đang xử lý</option>
                        <option ${status === "Đang vận chuyển" ? "selected" : ""} value="Đang vận chuyển">Đang vận chuyển</option>
                        <option ${status === "Đã hoàn thành" ? "selected" : ""} value="Đã hoàn thành" >Đã hoàn thành</option>
                        <option ${status === "Bị huỷ" ? "selected" : ""} value="Bị huỷ" >Bị huỷ</option>
                      </select>
                    </td>
                  </tr>`;
        }
        document.getElementById("renderOrder").innerHTML = ordered;
        let result = "";
        for (let i = 0; i < orderManage.length; i++) {
          let statusSelect = document.getElementById(`statusSelect${i}`);
          statusSelect.value = orderManage[i] && orderManage[i].status !== "" ? orderManage[i].status : "Đang xử lý";
          statusSelect.addEventListener("change", () => {
            let statusNew = statusSelect.value;
            orderManage[i].status = statusNew;
            localStorage.setItem("renderOrder", JSON.stringify(orderManage));
          });
        }
  
      }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      //Modal
      $("#show-emp").on("click", function () {
        $("#ModalUP").modal({ backdrop: false, keyboard: false })
      });
  
  
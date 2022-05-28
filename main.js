

$(document).ready(function () 
{

    let users = [];
    let detail = [];
    let show = [];
    let check = [];
    let selectedUsers = {};

    // getDetail();
    getUsers();
    getProduct();
    // getAllDetail();

    function getUsers() {
        $.getJSON("./get_customers.php", function (result) {
            users = result.data;
            displayHTML();
        })
    };

    function getProduct() 
    {
        $.getJSON("./getBill.php", function (result) {
            detail = result.data;
            displayBill();
        })
    };
    // function getAllDetail() 
    // {
    //     $.getJSON("./get_all_detail.php", function (result) {
    //         check = result.data;
    //         console.log(result.data)
    //         displayBill();
    //     })
    // };
    

    
    
    function displayHTML() {
        let markup = '';
        let size = users.length;
        for (let i = size - 1; i >= 0; i--) {
            let name = users[i].username;
            let email = users[i].email;
            let address = users[i].address;
            let phone = users[i].phone;
            let birthday = users[i].birthday;
            let confirm = users[i].confirm;
            let CMNDbefore = users[i].CMNDbefore;
            let CMNDafter = users[i].CMNDafter;

            if (confirm === "0" || confirm === "2") {
                markup = `
                <tr class="tr">
                    <th class="td" class="th" scope = 'row' id="${users[i].id}" > ${users[i].id} </th>
                    <td class="td" class="td"> <a data-index="${users[i].id}" class="detailUser" data-toggle='modal'  data-target='#detail-Modal'> ${name}</a></td>
                    <td class="td" class="td">${email}</td>
                    <td class="td" class="td">${address}</td>
                    <td class="td" class="td">${confirm}</td>
                    <td class="td" class="td">${CMNDbefore}</td>
                    <td class="td" class="td">${CMNDafter}</td>
                    

                    </tr>
                `;
                $('#usersTbl > tbody:last-child').append(markup);
            }

            else if (confirm === "1") {
                markup = `
                <tr class="tr">
                    <th class="td" class="th" scope = 'row' id="${users[i].id}" > ${users[i].id} </th>
                    <td class="td" class="td"> <a data-index="${users[i].id}" class="detailUser" data-toggle='modal'  data-target='#detail-Modal'> ${name}</a></td>
                    <td class="td" class="td">${email}</td>
                    <td class="td" class="td">${address}</td>
                    <td class="td" class="td">${phone}</td>
                    <td class="td" class="td">${birthday}</td>
                    <td class="td" class="td">${confirm}</td>
                    

                    </tr>
                `;
                $('#confirmedUsersTbl > tbody:last-child').append(markup);
            }
            else if (confirm === "-1") {
                markup = `
                <tr class="tr">
                    <th class="td" class="th" scope = 'row' id="${users[i].id}" > ${users[i].id} </th>
                    <td class="td" class="td"> <a data-index="${users[i].id}" class="detailUser" data-toggle='modal'  data-target='#detail-Modal'> ${name}</a></td>
                    <td class="td" class="td">${email}</td>
                    <td class="td" class="td">${address}</td>
                    <td class="td" class="td">${phone}</td>
                    <td class="td" class="td">${birthday}</td>
                    <td class="td" class="td">${confirm}</td>
                    <td class="td" class="td">${CMNDbefore}</td>
                    <td class="td" class="td">${CMNDafter}</td>
                    

                    </tr>
                `;
                $('#canceledUsersTbl > tbody:last-child').append(markup);
            }
            else if (confirm === "3") {
                markup = `
                <tr class="tr">
                    <th class="td" class="th" scope = 'row' id="${users[i].id}" > ${users[i].id} </th>
                    <td class="td" class="td"> <a data-index="${users[i].id}" class="detailUser" data-toggle='modal'  data-target='#detail-Modal'> ${name}</a></td>
                    <td class="td" class="td">${email}</td>
                    <td class="td" class="td">${address}</td>
                    <td class="td" class="td">${phone}</td>
                    <td class="td" class="td">${birthday}</td>
                    <td class="td" class="td">${confirm}</td>
                    <td class="td" class="td">${CMNDbefore}</td>
                    <td class="td" class="td">${CMNDafter}</td>
                    

                    </tr>
                `;
                $('#LockedUsersTbl > tbody:last-child').append(markup);
            }
       
        }

        
        

        $('.edit-btn').click(function () {
            let index = $(this).data('index');
            $("#edit-ID").val(index);
        })
        $('.del-btn').click(function () {
            let index = $(this).data('index');
            $('#del-ID').val(index);
        })
        $('.update-btn').click(function () {
            let index = $(this).data('index');
            $('#update-ID').val(index);
        })

        $('.detailUser').click(function () {
            let index = $(this).data('index');
            $('#detail-ID').val(index);
        })
        
    
    }

    function deleteAllRow() {
        $('#usersTbl').find('tr:gt(0)').remove();
    }
    $('#deleteBtn').click(function () {
        location.reload();
        cancelUser();
    });

    $('#editBtn').click(function () {
        location.reload();
        editUser();
    });

    $('#updateBtn').click(function () {
        location.reload();
        updateUser();
    });

    $('#getDetails').click(function () {
        location.href = `./detail.php?id=${$('#detail-ID').val()}`;
       
    });
    $('#accept').click(function () {
        location.href = `./detailUser.php?MaGD='${$('#MaGD').val()}'`;
    });
    

    function displayBill()
    {
        let markup = '';
        let size = detail.length;
        for (let i = size - 1; i >=0; i--) {
            let id = i;
            let name = detail[i].username;
            let phone = detail[i].phone;
            let dateTransfer = detail[i].dayTransfer;
            let moneyTransfer = detail[i].moneyTransfer;
            let type = detail[i].type;
            let status = detail[i].status;
            let MaGD = detail[i].MaGD;
            let phoneTemp = $('#phoneID').val();
            console.log(phoneTemp);
            if($('#phoneID').val()==phone){
                if(type == "Chuyển tiền" || type == "Mua card điện thoại")
                {
                    markup = `
                    <tr class="tr">
                        <th class="td" scope = 'row'> ${id} </th>
                        <td class="td">${MaGD}</td>
                        <td class="td"><a class="ChuyenTien" data-index="${MaGD}" data-toggle='modal'  data-target='#ChuyenTien-Modal'>${name}</a></td>
                        <td class="td">${dateTransfer}</td>
                        <td class="td">${moneyTransfer}</td>
                        <td class="td">${type}</td>
                        <td class="td">${status}</td>
                    </tr>
                    `;
                    $('#billTbl > tbody:last-child').append(markup);
                }
                else
                {
                    markup = `
                    <tr class="tr">
                        <th class="td" scope = 'row'> ${id} </th>
                        <td class="td">${MaGD}</td>
                        <td class="td">${name}</td>
                        <td class="td">${dateTransfer}</td>
                        <td class="td">${moneyTransfer}</td>
                        <td class="td">${type}</td>
                        <td class="td">${status}</td>
                    </tr>
                    `;
                    $('#billTbl > tbody:last-child').append(markup);
                }
            }
            

        }
        $('.ChuyenTien').click(function () {
            let index = $(this).data('index');
            $('#MaGD').val(index);
        
        })

    }
    // function deleteAllRow1(){
    //     $('#billTbl').find('tr:gt(0)').remove();
    // }
    // function showDetail()
    // {
    //     let param = {
    //         dayTransfer : selectedUsers,
    //     }
    //     console.log(param);
    //     console.log(JSON.stringify(param));
    //     $.ajax({
    //         url: './getDetail.php',
    //         dataType: 'json',
    //         type: 'GET',
    //         contentType: 'application/json',
    //         data: JSON.stringify(param),
    //         success: function(data,status)
    //         {
    //             alert("Success")
    //             deleteAllRow1();
    //             getDetail();
    //             // alert(JSON.stringify(param));
    //             $('#ChuyenTien-Modal').modal('hide');
    //         },
    //         error: function(data,status){
    //             alert(JSON.stringify(data));
    //             $('#ChuyenTien-Modal').modal('hide');
    //         }
    //     });
    // }
    // function getDetail() 
    // {
    //     $.getJSON("./getDetail.php", function (result) {
    //         show = result.data;
    //         console.log(result) 
    //         // displayBill();
    //     })
    // };

    function _ajax_request(url, data, callback, type, method) {
        if (jQuery.isFunction(data)) {
            callback = data;
            data = {};
        }
        return jQuery.ajax({
            type: method,
            url: url,
            data: data,
            success: callback,
            dataType: type
        });
    }
    jQuery.extend({
        put: function (url, data, callback, type) {
            return _ajax_request(url, data, callback, type, 'PUT');
        },

    });

    function editUser() {
        let param = {
            id: $("#edit-ID").val(),
        }

        console.log(JSON.stringify(param));
        $.put("./confirmUsers.php",
            JSON.stringify(param),
            function (data, status) {
                deleteAllRow();
                getUsers();
            }
        )
    }

    function updateUser() {
        let param = {
            id: $("#update-ID").val(),
        }

        console.log(JSON.stringify(param));
        $.put("./updateInfo.php",
            JSON.stringify(param),
            function (data, status) {
                deleteAllRow();
                getUsers();
            }
        )
    }

    function cancelUser() {
        let param = {
            id: $("#del-ID").val(),
        }

        console.log(JSON.stringify(param));
        $.put("./cancelUser.php",
            JSON.stringify(param),
            function (data, status) {
                deleteAllRow();
                getUsers();
            }
        )
    }

})


let MenuItems = document.querySelector(".menuItems");
function Handle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "400px";
    }
    else {
        MenuItems.style.maxHeight = "0px";
    }
}



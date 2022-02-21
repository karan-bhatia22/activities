$(document).ready(function(){
    let downloadBtn = $('#download');
    let invoiceMessage = $('input[name="invoice-message"]');
    let currencySelect = $('#currency-select');
    let currencyType = $('.currency-type');
    let tables = $('div[id^="table"'); // select all tables with id starting with string "table"
    let newLineBtn = $('.new-line-btn');
    let subTotal = $('#sub-total'); 
    let taxInput = $('#tax-input');
    let tax = $('#tax-value');
    let totalAmount = $('.total-amount');
    let invoiceNo = $('input[name="invoice-number"]');
    let toAddress = $('textarea[name="to-address"]');
    let invoiceDue = $('#invoice-due');
    let dateSelector = $('input[name="date-selector"]');
    let purchaseOrder = $('input[name="purchase-order-no"]');
    // pdf options
    const options = {
        margin: 7,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 3 },
        pagebreak: { mode: 'avoid-all' },
        jsPDF: { unit: 'mm', format: 'a4' },
    }

    addEventListenersToTables();

    // FUNCTIONS//
//===================================================================================================//
    // calculate sub total
function calculateSubTotal(){
    let sum = 0;
    for(let j = 0; j < tables.length; j ++)
    {
        let amt = $('#item-value-' + String(j + 1));
        sum += parseFloat(amt.text());
    }
    subTotal.text(String(sum));
}
//calculate Total
function calculateTotal(){
    let subTotalAmt = parseFloat(subTotal.text());
    let taxAmt = parseFloat(tax.text());
    let sum = subTotalAmt + taxAmt;
    totalAmount.text(String(sum.toFixed(2)));
}
// adding event listeners to all quantity, rate for change
function handleQuantityChange(quantity, rate, amount){
    quantity.attr('value', quantity.val());
    let num = parseFloat(quantity.val()) * parseFloat(rate.val());
    num = (Math.round(num*100)/100).toFixed(2);
    amount.text(num);
    calculateSubTotal();
    calculateTax();
    calculateTotal();
}
function handleRateChange(quantity, rate, amount){
    rate.attr('value', rate.val());
    let num = parseFloat(quantity.val()) * parseFloat(rate.val());
    num = (Math.round(num*100)/100).toFixed(2);
    amount.text(num);
    calculateSubTotal();
    calculateTax();
    calculateTotal();
}

function handleCopy(tableId){
    console.log("table to copy:" + tableId);
    let lastTable = $('div[id^="table"]:last');
    console.log("last table:" , lastTable);
    let idToClone = tableId;
    let num = parseInt( lastTable.prop("id").match(/\d+/g), 10 ) +1;
    console.log("new id: " + num);
    $('#table-' + idToClone).clone().prop('id', 'table-' + num).insertAfter('div[id^="table"]:last');
    makeNecessaryIdChanges(idToClone);
    let newQuantity = $('#quantity-' + String(tables.length));
    let newRate = $('#rate-' + String(tables.length));
    let newAmount = $('#item-value-' + String(tables.length));
    let newCopy = $('#copy-' + String(tables.length));
    let newItem = $('#item-selling-' + String(tables.length));
    newQuantity.change(function(){
        handleQuantityChange($(this), newRate, newAmount);
    });
    newRate.change(function(){
        handleRateChange(newQuantity, $(this), newAmount);
    });
    newItem.change(function(){
        let val = $(this).val();
        $(this).attr('value', val);
    });
    newCopy.on('click', function(){
        let idToClone = parseInt($(this).attr('id').substr(5));
        handleCopy(idToClone);
    });

    calculateSubTotal();
    calculateTax();
    calculateTotal();
}

function addEventListenersToTables(){
    for(let i = 0; i < tables.length; i++)
    {
        let quantity = $('#quantity-' + String(i + 1));
        let rate = $('#rate-' + String(i + 1));
        let amount = $('#item-value-'+ String(i + 1));
        let item = $('#item-selling-' + String(i + 1));
        let copyBtn = $('#copy-' + String(i + 1));

        quantity.change(function(){
            handleQuantityChange($(this), rate, amount);
        });
        rate.change(function(){
            handleRateChange(quantity, $(this), amount);
         });
         item.change(function(){
             let val = $(this).val();
             $(this).attr('value', val);
         });
         copyBtn.on('click', function(){
            handleCopy(i + 1);
         });
    }
}

function makeNecessaryIdChangesAndClearValues(){
    tables = $('div[id^="table"]');
    clonedTable = $('div[id^="table"]:last');
    clonedTable.find('#quantity-' + (tables.length - 1)).attr('id', 'quantity-' + tables.length);
    clonedTable.find('#quantity-' + (tables.length)).attr('value', 0);

    clonedTable.find('#rate-' + (tables.length - 1)).attr('id', 'rate-' + tables.length);
    clonedTable.find('#rate-' + (tables.length)).attr('value', '0');

    clonedTable.find('#item-value-' + (tables.length - 1)).attr('id', 'item-value-' + tables.length);
    clonedTable.find('#item-value-' + (tables.length)).text('0');

    clonedTable.find('#item-selling-' + (tables.length - 1)).attr('id', 'item-selling-' + tables.length);
    clonedTable.find('#item-selling-' + (tables.length)).val('');

    clonedTable.find('#copy-' + (tables.length - 1)).attr('id', 'copy-' + tables.length);
    currencyType = $('.currency-type');
}

function makeNecessaryIdChanges(id){
    tables = $('div[id^="table"]');
    clonedTable = $('div[id^="table"]:last');
    clonedTable.find('#quantity-' + (id)).attr('id', 'quantity-' + tables.length);
    clonedTable.find('#rate-' + (id)).attr('id', 'rate-' + tables.length);
    clonedTable.find('#item-value-' + (id)).attr('id', 'item-value-' + tables.length);
    clonedTable.find('#item-selling-' + (id)).attr('id', 'item-selling-' + tables.length);
    clonedTable.find('#copy-' + (id)).attr('id', 'copy-' + tables.length);
    currencyType = $('.currency-type');
}

function calculateTax(){
    let subtotalAmt = parseFloat(subTotal.text());
    let rate = parseFloat(taxInput.val());
    let taxAmt = parseFloat((subtotalAmt * rate)/100).toFixed(2);
    tax.text(taxAmt);
}
// ======================================================================= //


// EVENT LISTENERS //
// ======================================================================= //

    //download btn click handler
    downloadBtn.on('click', async function(){
        let source = $('#invoice').html();
        html2pdf(source, options);
    });

    $('button').attr('title', 'Click me');

    // invoice-message change handler
    invoiceMessage.bind('change paste keyup', function () {
        let val = $(this).val();
        $(this).attr('value', val);
    });

    //invoice number change handler
    invoiceNo.bind('change paste keyup', function(){
        let val = $(this).val();
        $(this).attr('value', val);
    });

    // to address change handler
    toAddress.bind('change paste keyup', function(){
        let val = $(this).val();
        $(this).attr('value', val);
        $(this).text(val);
    });

    //invoice due change handler
    invoiceDue.change(function(){
        let val = $(this).val();
        $("option[value= " + $(this).val() + "]").attr('selected', true).siblings().removeAttr("selected");
        $(this).attr('value', val);
    });

    // date selector change handler
    dateSelector.change(function(){
        let val = $(this).val();
        $(this).attr('value', val);
    });
    purchaseOrder.change(function(){
        let val = $(this).val();
        $(this).attr('value', val);
    });
    // currency select change handler
    currencySelect.change(function(){
        let val = $(this).val();
        $("option[value= " + $(this).val() + "]").attr('selected', true).siblings().removeAttr("selected");
        $(this).attr('value', val);
        currencyType.text($(this).val());
    });
       // add event listener for new line button click
       newLineBtn.on('click', function(){
        let $div = $('div[id^="table"]:last');
        let num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;
        $('div[id^="table"]:last').clone().prop('id', 'table-' + num).insertAfter('div[id^="table"]:last');
        makeNecessaryIdChangesAndClearValues();
        let newQuantity = $('#quantity-' + String(tables.length));
        let newRate = $('#rate-' + String(tables.length));
        let newAmount = $('#item-value-' + String(tables.length));
        let newCopy = $('#copy-' + String(tables.length));
        let newItem = $('#item-selling-' + String(tables.length));
        newQuantity.change(function(){
            handleQuantityChange($(this), newRate, newAmount);
        });
        newRate.change(function(){
            handleRateChange(newQuantity, $(this), newAmount);
        });
        newItem.change(function(){
            let val = $(this).val();
            $(this).attr('value', val);
        });
        newCopy.on('click', function(){
            let idToClone = parseInt($(this).attr('id').substr(5));
            handleCopy(idToClone);
        });
        calculateSubTotal();
        calculateTax();
        calculateTotal();
    });


    // event listener on change of tax value
    taxInput.change(function(){
        let val = $(this).val();
        $(this).attr('value', val);
        calculateTax();
        calculateTotal();
    });

    // ============================================================================= //
 
});


$(document).ready(function () {
    let downloadBtn = $('#download');
    let invoiceMessage = $('input[name="invoice-message"]');
    let currencySelect = $('#currency-select');
    let currencyType = $('.currency-type');
    let tables = $('div[id^="table"]'); // select all tables with id starting with string "table"
    let firstTable = tables[0];
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
    const currencyConversionRates = {
        'INR':{
            'GBP': 0.009858044164,
            'USD': 0.01340123291,
            'AUD': 0.01852537977
        },
        'GBP':{
            'INR': 101.4400000004,
            'USD': 1.3600000001,
            'AUD': 1.8800000001
        },
        'USD':{
            'INR': 74.6200000191,
            'GBP': 0.7352941176,
            'AUD': 1.3799999999
        },
        'AUD':{
            'INR': 53.9800000008,
            'GBP': 0.5319148936,
            'USD': 0.7246376812
        }
    }
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
    function calculateSubTotal() {
        let sum = 0;
        for (let j = 0; j < tables.length; j++) {
            let amt = $('#item-value-' + String(j + 1));
            sum += parseFloat(amt.text());
        }
        subTotal.text(String(sum));
    }
    //calculate Total
    function calculateTotal() {
        let subTotalAmt = parseFloat(subTotal.text());
        let taxAmt = parseFloat(tax.text());
        let sum = subTotalAmt + taxAmt;
        totalAmount.text(String(sum.toFixed(2)));
    }
    // adding event listeners to all quantity, rate for change
    function handleQuantityChange(quantity, rate, amount) {
        if (quantity.val() && quantity.val() >= 0)
            quantity.attr('value', quantity.val());
        else
            quantity.val(0);
        let num = parseFloat(quantity.val()) * parseFloat(rate.val());
        num = (Math.round(num * 100) / 100).toFixed(2);
        amount.text(num);
        calculateSubTotal();
        calculateTax();
        calculateTotal();
    }

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }


    function handleRateChange(quantity, rate, amount) {
        if (rate.val() == "" || rate.val() == " " || parseFloat(rate.val()) < 0 || !isNumeric(rate.val())) // if rate is not defined or negative or is not numeric
            rate.val('0');
        else
            rate.attr('value', rate.val());
        let num = parseFloat(quantity.val()) * parseFloat(rate.val());
        num = (Math.round(num * 100) / 100).toFixed(2);
        amount.text(num);
        calculateSubTotal();
        calculateTax();
        calculateTotal();
    }

    function handleCopy(tableId) {
        let lastTable = $('div[id^="table"]:last');
        let idToClone = tableId;
        let num = parseInt(lastTable.prop("id").match(/\d+/g), 10) + 1;
        $('#table-' + idToClone).clone().prop('id', 'table-' + num).insertAfter('div[id^="table"]:last');
        makeNecessaryIdChanges(idToClone);
        let newQuantity = $('#quantity-' + String(tables.length));
        let newRate = $('#rate-' + String(tables.length));
        let newAmount = $('#item-value-' + String(tables.length));
        let newCopy = $('#copy-' + String(tables.length));
        let newItem = $('#item-selling-' + String(tables.length));
        let newDelete = $('#delete-' + String(tables.length));
        newQuantity.change(function () {
            handleQuantityChange($(this), newRate, newAmount);
        });
        newRate.change(function () {
            handleRateChange(newQuantity, $(this), newAmount);
        });
        newItem.change(function () {
            let val = $(this).val();
            $(this).attr('value', val);
        });
        newCopy.on('click', function () {
            let idToClone = parseInt($(this).attr('id').substr(5));
            handleCopy(idToClone);
        });
        newDelete.on('click', function () {
            let idToDelete = parseInt($(this).attr('id').substr(7));
            handleDelete(idToDelete);
        });

        calculateSubTotal();
        calculateTax();
        calculateTotal();
    }

    function handleDelete(tableId) {
        let tableToDelete = $('#table-' + tableId);
        tableToDelete.remove();
        tables = $('div[id^="table"]');
        calculateSubTotal();
        calculateTax();
        calculateTotal();
    }
    function addEventListenersToTables() {
        for (let i = 0; i < tables.length; i++) {
            let quantity = $('#quantity-' + String(i + 1));
            let rate = $('#rate-' + String(i + 1));
            let amount = $('#item-value-' + String(i + 1));
            let item = $('#item-selling-' + String(i + 1));
            let copyBtn = $('#copy-' + String(i + 1));
            let deleteBtn = $('#delete-' + String(i + 1));

            quantity.change(function () {
                handleQuantityChange($(this), rate, amount);
            });
            rate.change(function () {
                handleRateChange(quantity, $(this), amount);
            });
            item.change(function () {
                let val = $(this).val();
                $(this).attr('value', val);
            });
            copyBtn.on('click', function () {
                handleCopy(i + 1);
            });
            deleteBtn.on('click', function () {
                handleDelete(i + 1);
            });
        }
    }

    function makeNecessaryIdChangesAndClearValues() {
        tables = $('div[id^="table"]');
        let clonedTable = $('div[id^="table"]:last');
        clonedTable.find('#quantity-' + (tables.length - 1)).attr('id', 'quantity-' + tables.length);
        clonedTable.find('#quantity-' + (tables.length)).val(0);

        clonedTable.find('#rate-' + (tables.length - 1)).attr('id', 'rate-' + tables.length);
        clonedTable.find('#rate-' + (tables.length)).val('0');

        clonedTable.find('#item-value-' + (tables.length - 1)).attr('id', 'item-value-' + tables.length);
        clonedTable.find('#item-value-' + (tables.length)).text('0');

        clonedTable.find('#item-selling-' + (tables.length - 1)).attr('id', 'item-selling-' + tables.length);
        clonedTable.find('#item-selling-' + (tables.length)).val('');

        clonedTable.find('#copy-' + (tables.length - 1)).attr('id', 'copy-' + tables.length);
        clonedTable.find('#delete-' + (tables.length - 1)).attr('id', 'delete-' + tables.length);
        currencyType = $('.currency-type');
    }

    function makeNecessaryIdChanges(id) {
        tables = $('div[id^="table"]');
        let clonedTable = $('div[id^="table"]:last');
        clonedTable.find('#quantity-' + (id)).attr('id', 'quantity-' + tables.length);
        clonedTable.find('#rate-' + (id)).attr('id', 'rate-' + tables.length);
        clonedTable.find('#item-value-' + (id)).attr('id', 'item-value-' + tables.length);
        clonedTable.find('#item-selling-' + (id)).attr('id', 'item-selling-' + tables.length);
        clonedTable.find('#copy-' + (id)).attr('id', 'copy-' + tables.length);
        clonedTable.find('#delete-' + (id)).attr('id', 'delete-' + tables.length);
        currencyType = $('.currency-type');
    }

    function calculateTax() {
        let subtotalAmt = parseFloat(subTotal.text());
        let rate;
        if (!taxInput.val() || parseFloat(taxInput.val()) < 0 || !isNumeric(taxInput.val()))
            taxInput.val('0');
        rate = parseFloat(taxInput.val());
        let taxAmt = parseFloat((subtotalAmt * rate) / 100).toFixed(2);
        tax.text(taxAmt);
    }
    // ======================================================================= //


    // EVENT LISTENERS //
    // ======================================================================= //

    //download btn click handler
    downloadBtn.on('click', async function () {
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
    invoiceNo.bind('change paste keyup', function () {
        let val = $(this).val();
        $(this).attr('value', val);
    });

    // to address change handler
    toAddress.bind('change paste keyup', function () {
        let val = $(this).val();
        $(this).attr('value', val);
        $(this).text(val);
    });

    //invoice due change handler
    invoiceDue.change(function () {
        let val = $(this).val();
        $("option[value= " + $(this).val() + "]").attr('selected', true).siblings().removeAttr("selected");
        $(this).attr('value', val);
    });

    // date selector change handler
    dateSelector.change(function () {
        let val = $(this).val();
        $(this).attr('value', val);
    });
    purchaseOrder.change(function () {
        let val = $(this).val();
        $(this).attr('value', val);
    });
    // currency select change handler and convert according to latest exchange rates fetched from free currency converter api
    let previousCurrency;
    currencySelect.focus(function () {
        previousCurrency = $(this).val();
    })
        .change(async function () {


            let currentCurrency = $(this).val(); // currency type
            $("option[value= " + $(this).val() + "]").attr('selected', true).siblings().removeAttr("selected");
            $(this).attr('value', currentCurrency);
            currencyType.text($(this).val());
            let conversionRate = currencyConversionRates[previousCurrency][currentCurrency];
            previousCurrency = currentCurrency; // update the previous currency
            for (let i = 0; i < tables.length; i++) {
                let rate = $('#rate-' + String(i + 1));
                let quantity = $('#quantity-' + String(i + 1));
                let amount = $('#item-value-' + String(i + 1));
                //update the rate and amount
                rate.val(parseFloat(rate.val() * conversionRate).toFixed(2));
                amount.text(parseFloat(quantity.val() * rate.val()).toFixed(2));
            }
            calculateSubTotal();
            calculateTax();
            calculateTotal();
        });
    // add event listener for new line button click
    newLineBtn.on('click', function () {
        if (tables.length === 0) {
            tables.push(firstTable);
            $('.heading').after(tables[tables.length - 1]);
        }
        else {
            let $div = $('div[id^="table"]:last');
            let num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            $('div[id^="table"]:last').clone().prop('id', 'table-' + num).insertAfter('div[id^="table"]:last');
        }
        makeNecessaryIdChangesAndClearValues();
        let newQuantity = $('#quantity-' + String(tables.length));
        let newRate = $('#rate-' + String(tables.length));
        let newAmount = $('#item-value-' + String(tables.length));
        let newCopy = $('#copy-' + String(tables.length));
        let newItem = $('#item-selling-' + String(tables.length));
        let newDelete = $('#delete-' + String(tables.length));
        newQuantity.change(function () {
            handleQuantityChange($(this), newRate, newAmount);
        });
        newRate.change(function () {
            handleRateChange(newQuantity, $(this), newAmount);
        });
        newItem.change(function () {
            let val = $(this).val();
            $(this).attr('value', val);
        });
        newCopy.on('click', function () {
            let idToClone = parseInt($(this).attr('id').substr(5));
            handleCopy(idToClone);
        });
        newDelete.on('click', function () {
            let idToDelete = parseInt($(this).attr('id').substr(7));
            handleDelete(idToDelete);
        })
        calculateSubTotal();
        calculateTax();
        calculateTotal();
    });


    // event listener on change of tax value
    taxInput.change(function () {
        let val = $(this).val();
        $(this).attr('value', val);
        calculateTax();
        calculateTotal();
    });

    // ============================================================================= //

});


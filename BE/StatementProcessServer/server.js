var express = require('express');
var db = require('./db/db');
var bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// =========== Get all the transactions ============
app.get('/getTransactionList', (req, res) => {
    var txnList = db.trasactionList;
    res.status(200).send({
        success: 'true',
        message: 'Transaction list retrieved successfully!',
        txnList
    });
});

// =========== Validate all the transactions =========
app.post('/validateTransaction', (req, res) => {
    var failedTxn = [];
    const transactions = req.body.transactions;
    db.trasactionList = req.body.transactions;

    // Check whether the same transaction get duplicated or not
    var findTransaction = function(txnList, txn) {
        if (txn && txn.reference) {
            var filteredTxns = txnList.filter(function(obj) {
                return obj.reference == txn.reference;
            });
            return filteredTxns.length > 1;
        }
        return false;        
    };

    // Check whether, End balance is correct or not
    var validateTxn = function(txn) {
        if (txn && (txn.startbalance && txn.mutation)) {
            var balance = parseFloat(txn.startbalance) + parseFloat(txn.mutation);
            return balance.toFixed(2) != txn.endbalance;
        }
        return false;        
    };

    transactions.map(function(txn) {
        if (validateTxn(txn) || findTransaction(transactions, txn)) {
            failedTxn.push({'description' : txn.description, 'reference' : txn.reference});
        }
    });

    db.failedTxnList.push(failedTxn);

    return res.status(201).send({
        success: 'true',
        message: 'Failed transactions retrieved successfully!',
        failedTxn
    })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
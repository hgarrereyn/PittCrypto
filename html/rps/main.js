
// contractAddress = '0xe52f7911c8139b43b75d2cb00f7be228aa79b31e'; // john
// contractAddress = '0x4d5e9baa649b5a9566aeced6a9691edd4cfb5546' // test 2
// contractAddress = '0x1e88de2a0d5183ee4f829a0c76f9acf3f122a26c' // test 2
contractAddress = '0x69d60e272da8d33b801d7099e6818bf1fac64a28' // john 2


// main: 0xc74f999962942691b32bbd64d0579380026fc14f
// second: 0x0071e11b9f43cddeff70662c9aaa19c1f904ab40


window.addEventListener('load', function() {
    console.log('connecting web3...')

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
        no_web3();
    }

    check_network()

});

function check_network(){
    console.log('checking network...')
    web3js.version.getNetwork((err, netId) => {

        if (netId == 3) {
            // Ropsten
            console.log('On Ropsten network')
            load();
        } else {
            console.log('Error: not on Ropsten network');
        }

    })
}

function no_web3(){
    alert('Need metamask');
}

function load(){
    console.log('loading...');
    
    var rpsContract = web3js.eth.contract([
        {
            "constant": false,
            "inputs": [],
            "name": "claimWin",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_choice",
                    "type": "uint8"
                },
                {
                    "name": "_entropy",
                    "type": "uint256"
                }
            ],
            "name": "reveal",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_hash",
                    "type": "uint256"
                }
            ],
            "name": "submit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "Tie",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_winner",
                    "type": "address"
                }
            ],
            "name": "Winner",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "name": "_opponent",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "choice1",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "choice2",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_choice",
                    "type": "uint8"
                },
                {
                    "name": "_entropy",
                    "type": "uint256"
                }
            ],
            "name": "genHash",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "hash1",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "hash2",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "opponent",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "reveal_block_time",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "withdraw_block_time",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]);
    var rps = rpsContract.at(contractAddress)

    window.rps = rps;

    console.log('loaded contract');

    setup();
}

function get_owner() {
    return new Promise(function(resolve, reject) {
        rps.owner(function(err, data) {
            if (err != null) reject(err);
            else resolve(data);
        });
    });
}

function get_opponent() {
    return new Promise(function(resolve, reject) {
        rps.opponent(function(err, data) {
            if (err != null) reject(err);
            else resolve(data);
        });
    });
}

function get_hash1() {
    return new Promise(function(resolve, reject) {
        rps.hash1(function(err, data) {
            if (err != null) reject(err);
            else resolve(web3js.toBigNumber(data).toString(10));
        });
    });
}

function get_hash2() {
    return new Promise(function(resolve, reject) {
        rps.hash2(function(err, data) {
            if (err != null) reject(err);
            else resolve(web3js.toBigNumber(data).toString(10));
        });
    });
}

function get_choice1() {
    return new Promise(function(resolve, reject) {
        rps.choice1(function(err, data) {
            if (err != null) reject(err);
            else resolve(data['c'][0]);
        });
    });
}

function get_choice2() {
    return new Promise(function(resolve, reject) {
        rps.choice2(function(err, data) {
            if (err != null) reject(err);
            else resolve(data['c'][0]);
        });
    });
}

function get_blocknumber() {
    return new Promise(function(resolve, reject) {
        web3js.eth.getBlockNumber(function(err, data) {
            if (err != null) reject(err);
            else resolve(data);
        });
    });
}

function genHash(choice, entropy) {
    return new Promise(function(resolve, reject) {
        rps.genHash(choice, entropy, function(err, data) {
            if (err != null) reject(err);
            else resolve(web3js.toBigNumber(data).toString(10));
        });
    });
}

function get_reveal_block_time() {
    return new Promise(function(resolve, reject) {
        rps.reveal_block_time(function(err, data) {
            if (err != null) reject(err);
            else resolve(data['c'][0]);
        });
    });
}

async function setup(){
    // set main account
    window.account = web3js.eth.accounts[0];
    $('#account').text(account)

    // mining state variables
    window.isMiningCommit = false;
    window.isMiningReveal = false;
    window.isMiningClaim = false;
    window.isMiningWithdraw = false;

    // display contract address
    $('#contract').text(contractAddress);

    owner = await get_owner();
    opponent = await get_opponent();

    is_owner = true;

    if (account == owner) {
        console.log('Owner');
        is_owner = true;
    } else if (account == opponent) {
        console.log('Opponent');
        is_owner = false;
    } else {
        alert('Error: Address does not match owner or opponent')
    }

    if (is_owner) {
        $('#addrA').text(owner);
        $('#addrB').text(opponent);
    } else {
        $('#addrA').text(opponent);
        $('#addrB').text(owner);
    }

    // click handlers
    update_commit();
    $('#commitChoiceRock').click(update_commit);
    $('#commitChoicePaper').click(update_commit);
    $('#commitChoiceScissors').click(update_commit);
    $('#commitEntropy').on('change paste keyup', update_commit);
    $('#commit_btn').click(send_commit);

    update_reveal();
    $('#revealChoiceRock').click(update_reveal);
    $('#revealChoicePaper').click(update_reveal);
    $('#revealChoiceScissors').click(update_reveal);
    $('#revealEntropy').on('change paste keyup', update_reveal);
    $('#reveal_btn').click(send_reveal);

    $('#claim_btn').click(claim_victory);

    // event handlers
    rps.Winner().watch(function(err, res) {
        winner = res['args']['_winner'];

        if (account == winner) {
            alert('You won!');
        } else {
            alert('Oh no, you lost!');
        }
    });

    rps.Tie().watch(function(err, res) {
        alert('It was a tie!');
    });

    refresh();
}

async function refresh() {

    block = await get_blocknumber();
    $('#blockNumber').text(block);

    check_opp_commit();
    check_self_commit();
    check_opp_reveal();
    check_self_reveal();

    setTimeout(refresh, 3000);
    $('#refresh_bar').removeClass('go');

    setTimeout(function(){
        $('#refresh_bar').addClass('go');
    }, 50);
}

async function update_commit() {
    rps_choice = $('input[name=commitChoice]:checked').val();
    entropy = $('#commitEntropy').val();

    toCommit = await genHash(rps_choice, entropy);

    $('#selfToCommit').text(toCommit);
}

async function update_reveal() {
    rps_choice = $('input[name=revealChoice]:checked').val();
    entropy = $('#revealEntropy').val();

    comm = 0;

    if (is_owner) {
        comm = await get_hash1();
    } else {
        comm = await get_hash2();
    }

    toReveal = await genHash(rps_choice, entropy);

    $('#selfToReveal').text(toReveal);

    if (comm != toReveal) {
        $('#selfToReveal').addClass('wrong');
        $('#reveal_btn').addClass('disabled');
    } else {
        $('#selfToReveal').removeClass('wrong');
        $('#reveal_btn').removeClass('disabled');
    }
}

async function send_commit() {
    rps_choice = $('input[name=commitChoice]:checked').val();
    entropy = $('#commitEntropy').val();

    toCommit = await genHash(rps_choice, entropy);

    rps.submit(toCommit, {from: account, value: 10000000000000000, gasPrice: 10000000000}, function(err, data){
        if (err == null) {
            console.log('waiting for: ' + data);
            isMiningCommit = true;

            check_self_commit();
        } else {
            console.log(err);
        }
    });
}

async function send_reveal() {
    rps_choice = $('input[name=revealChoice]:checked').val();
    entropy = $('#revealEntropy').val();

    rps.reveal(rps_choice, entropy, {from: account, gasPrice: 10000000000}, function(err, data){
        if (err == null) {
            console.log('waiting for: ' + data);
            isMiningReveal = true;

            check_self_reveal();
        } else {
            console.log(err);
        }
    });
}

async function claim_victory() {

    rps.claimWin({from: account, gasPrice: 10000000000}, function(err, data){
        if (err != null) {
            console.log('waiting for: ' + data);
            isMiningClaim = true;
        }
    });

}

async function check_self_commit() {

    comm = 0;

    if (is_owner) {
        comm = await get_hash1();
    } else {
        comm = await get_hash2();
    }

    if (comm == 0) {
        if (isMiningCommit) {
            $('#self_mining_commit').show();
            $('#self_need_commit').hide();
            $('#self_has_commit').hide();
        } else {
            $('#self_mining_commit').hide();
            $('#self_need_commit').show();
            $('#self_has_commit').hide();
        }
    } else {
        isMiningCommit = false;
        $('#self_mining_commit').hide();
        $('#self_need_commit').hide();
        $('#self_has_commit').show();
        $('#self_comm').text(comm);
    }

}

async function check_opp_commit() {

    comm = 0;

    if (is_owner) {
        comm = await get_hash2();
    } else {
        comm = await get_hash1();
    }

    if (comm == 0) {
        $('#com_received').hide();
        $('#com_waiting').show();
    } else {
        $('#com_waiting').hide();
        $('#com_received').show();
        $('#opp_comm').text(comm);
    }

}

async function check_self_reveal() {

    comm1 = await get_hash1();
    comm2 = await get_hash2();

    reveal = 0;

    if (is_owner) {
        reveal = await get_choice1();
    } else {
        reveal = await get_choice2();
    }

    if (comm1 == 0 || comm2 == 0) {
        isMiningReveal = false;
        $('#self_rev_mining').hide();
        $('#self_rev_pre').show();
        $('#self_rev_waiting').hide();
        $('#self_rev_reveal').hide();
    } else if (reveal == 0) {
        if (isMiningReveal) {
            $('#self_rev_mining').show();
            $('#self_rev_pre').hide();
            $('#self_rev_waiting').hide();
            $('#self_rev_reveal').hide();
        } else {
            $('#self_rev_mining').hide();
            $('#self_rev_pre').hide();
            $('#self_rev_waiting').show();
            $('#self_rev_reveal').hide();
        }
        
    } else {
        isMiningReveal = false;
        $('#self_rev_mining').hide();
        $('#self_rev_pre').hide();
        $('#self_rev_waiting').hide();
        $('#self_rev_reveal').show();

        $('#self_rev_choice').text(['Rock', 'Paper', 'Scissors'][reveal])
    }

}

async function check_opp_reveal() {

    comm1 = await get_hash1();
    comm2 = await get_hash2();

    r = 0;
    has_reveal = 0;

    if (is_owner) {
        r = await get_choice2();
        has_reveal = await get_choice1();
    } else {
        r = await get_choice1();
        has_reveal = await get_choice2();
    }

    block = await get_blocknumber();
    rbt = await get_reveal_block_time();

    diff = (rbt + 20) - block;

    if (comm1 == 0 || comm2 == 0) {
        $('#rev_pre').show();
        $('#rev_waiting').hide();
        $('#rev_reveal').hide();
    } else if (r == 0) {
        $('#rev_pre').hide();
        $('#rev_waiting').show();
        $('#rev_reveal').hide();

        if (has_reveal) {
            $('#rev_claim').show();
            $('#rev_claim_time').text(diff);
            if (diff > 0) {
                $('#rev_claim_maybe').show();
                $('#claim_btn').addClass('disabled');
            } else {
                $('#rev_claim_maybe').hide();
                $('#claim_btn').removeClass('disabled');
            }
        } else {
            $('#rev_claim').hide();
        }
    } else {
        $('#rev_pre').hide();
        $('#rev_waiting').hide();
        $('#rev_reveal').show();

        $('#rev_reveal_choice').text(['Rock', 'Paper', 'Scissors'][r])
    }

}
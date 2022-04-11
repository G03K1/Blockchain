class Blockchain {
    constructor() {
        this.chain = [];
    }

    // Wenn wir ein await haben, müssen wir vor die Funktion ein async schreiben
    async addBlock(block, nodeID) {
        let lb = this.getLastBlock();
        block.data.moneyTable = lb ? lb.data.moneyTable : [];
        // Wenn der letzte Block existiert, dann verwende lb.createHash(), wenn nicht dann packe einen leeren Text in die Variable lastHash
        block.lastHash = lb ? lb.createHash() : '';
        try {
            // Wenn wir ein await haben, müssen wir vor die Funktion ein async schreiben
            await block.mine();
            broadcaster.notify(nodeID);
            // Object.freeze -> Objekt kann dadurch nicht mehr bearbeitet werden 
            // (Hat nichts mit Validierung zu tun, dient nur zur doppelten Sicherung)
            this.chain.push(Object.freeze(block));
            log(`Block ${this.chain.length} wurde gemined von Node ${nodeID}!`);
        } catch (e) {
            console.log(e);
        }
    }


    isValid() {
        // Der aktuelle Block und der Index werden mitgegeben -> Der Code in den geschweiften Klammern wird für jeden Block in der Blockchain aufgerufen
        // currBlock ist immer das gesamte Blockobjekt & "i" ist die Nummer des Blocks
        let invalidBlock = this.chain.find((currBlock, i) => {
            let prevBlock = this.chain[i - 1];
            return prevBlock && prevBlock.createHash() != currBlock.lastHash;
        });
        // Wenn obere Funktion gültig -> true, ungültig -> false
        if (invalidBlock) {
            return true;
        } else {
            return false;
        }
    }


    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
}


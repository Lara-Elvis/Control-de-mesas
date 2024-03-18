let stock = []; // Arreglo para mantener el stock de mesas
    let numMesa = 10; // Número de mesa para incrementar al agregar al stock
    const bodegas = [{nombre: 'Bodega 1', mesas: []}, {nombre: 'Bodega 2', mesas: []}, {nombre: 'Bodega 3', mesas: []}];

    function actualizarBodegas() {
        const bodegasContainer = document.getElementById('bodegas-container');
        bodegasContainer.innerHTML = '';

        bodegas.forEach(bodega => {
            const bodegaDiv = document.createElement('div');
            bodegaDiv.classList.add('bodega');
            bodegaDiv.setAttribute('id', `bodega-${bodega.nombre}`);
            bodegaDiv.innerHTML = `<h2>${bodega.nombre}</h2>`;
            bodegaDiv.ondragover = (event) => { event.preventDefault(); };
            bodegaDiv.ondrop = (event) => { soltarMesa(event, bodega.nombre); };

            bodega.mesas.forEach((mesa, index) => {
                const mesaDiv = document.createElement('div');
                mesaDiv.classList.add('mesa');
                mesaDiv.setAttribute('draggable', 'true');
                mesaDiv.textContent = mesa;
                mesaDiv.onclick = () => { devolverAlStock(mesa); };
                mesaDiv.ondragstart = (event) => { arrastrarMesa(event, mesa); };
                bodegaDiv.appendChild(mesaDiv);
            });

            bodegasContainer.appendChild(bodegaDiv);
        });
    }

    function actualizarStock() {
        const stockDiv = document.getElementById('stock');
        stockDiv.innerHTML = '<h2>Stock de Mesas</h2>';

        stock.forEach((mesa, index) => {
            const mesaDiv = document.createElement('div');
            mesaDiv.classList.add('mesa');
            mesaDiv.setAttribute('draggable', 'true');
            mesaDiv.textContent = mesa;
            mesaDiv.onclick = () => { moverAlStock(mesa); };
            mesaDiv.ondragstart = (event) => { arrastrarMesa(event, mesa); };
            stockDiv.appendChild(mesaDiv);
        });
    }

    function arrastrarMesa(event, mesa) {
        event.dataTransfer.setData('text/plain', mesa);
    }

    function soltarMesa(event, bodegaNombre) {
        event.preventDefault();
        const mesa = event.dataTransfer.getData('text/plain');
        const bodega = bodegas.find(b => b.nombre === bodegaNombre);
        const index = stock.indexOf(mesa);
        if (index !== -1) {
            stock.splice(index, 1);
        } else {
            bodegas.forEach(b => {
                const mesaIndex = b.mesas.indexOf(mesa);
                if (mesaIndex !== -1) {
                    b.mesas.splice(mesaIndex, 1);
                }
            });
        }
        bodega.mesas.push(mesa);
        actualizarBodegas();
        actualizarStock();
    }

    function devolverAlStock(mesa) {
        bodegas.forEach(b => {
            const index = b.mesas.indexOf(mesa);
            if (index !== -1) {
                b.mesas.splice(index, 1);
                stock.push(mesa);
            }
        });
        actualizarBodegas();
        actualizarStock();
    }

    function moverAlStock(mesa) {
        const index = stock.indexOf(mesa);
        if (index === -1) {
            bodegas.forEach(b => {
                const mesaIndex = b.mesas.indexOf(mesa);
                if (mesaIndex !== -1) {
                    b.mesas.splice(mesaIndex, 1);
                    stock.push(mesa);
                }
            });
        }
        actualizarBodegas();
        actualizarStock();
    }

    document.getElementById('agregar-mesa-stock').onclick = () => {
        numMesa++;
        stock.push(`Mesa ${numMesa}`);
        actualizarStock();
    };

    // Inicialización de las bodegas y el stock
    for (let i = 0; i < 10; i++) {
        stock.push(`Mesa ${i + 1}`);
    }
    actualizarBodegas();
    actualizarStock();
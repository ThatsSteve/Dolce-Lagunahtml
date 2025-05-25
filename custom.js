document.addEventListener('DOMContentLoaded', function() {
    // Aggiungi stili CSS per indirizzo
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .address-display {
            display: flex;
            align-items: flex-start;
            background: transparent;
            padding: 1.5rem 0;
            margin: 0;
            border-left: none;
            box-shadow: none;
        }
        
        .address-icon {
            color: #942e2f;
            font-size: 2.5rem;
            margin-right: 1.5rem;
            margin-top: 0.5rem;
        }
        
        .address-content {
            flex: 1;
        }
        
        .address-main {
            font-family: 'Cinzel', serif;
            font-size: 1.3rem;
            color: #942e2f;
            margin-bottom: 0.5rem;
        }
        
        .address-sub {
            color: #666;
            margin-bottom: 0.3rem;
        }

        /* Stili specifici per il footer */
        .footer .address-icon {
            color: #fff;
        }
        
        .footer .address-main {
            color: #fff;
        }
        
        .footer .address-sub {
            color: rgba(255, 255, 255, 0.8);
        }
        
        .copy-address-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background: #942e2f;
            color: white;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 50px;
            font-family: 'Playfair Display', serif;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 1rem;
        }
        
        .copy-address-btn:hover {
            background: #e89700;
            transform: translateY(-2px);
        }
        
        .copy-address-btn.copied {
            background: #28a745;
        }
        
        @media screen and (max-width: 768px) {
            .address-display {
                padding: 1rem 0;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .address-icon {
                margin-right: 0;
                margin-bottom: 1rem;
            }
            
            .address-main {
                font-size: 1.2rem;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Verifica se siamo in una pagina con il popup delle feature
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        // Sovrascrive la funzione di apertura del popup per la feature "location"
        const locationCard = document.querySelector('.feature-card[data-feature="location"]');
        if (locationCard) {
            locationCard.addEventListener('click', function() {
                // Attendi che il modal sia visibile
                setTimeout(function() {
                    const featureModalMap = document.querySelector('.feature-modal-map');
                    if (featureModalMap) {
                        // Rimuove stili inline che potrebbero interferire
                        featureModalMap.style.boxShadow = 'none';
                        featureModalMap.style.borderRadius = '0';
                        featureModalMap.style.overflow = 'visible';
                        featureModalMap.style.background = 'transparent';
                        featureModalMap.innerHTML = `
                            <div class="address-display">
                                <i class="fas fa-map-marker-alt address-icon"></i>
                                <div class="address-content">
                                    <p class="address-main">Via Alessandria 41/b - 43/a</p>
                                    <p class="address-sub">30173 Tessera (VE)</p>
                                    <p class="address-sub">CIN: IT027042B4CSA6DFBW - IT027042B4TDP8CF3K</p>
                                </div>
                            </div>
                        `;
                        featureModalMap.style.display = 'block';
                    }
                    
                    // Modifica i pulsanti esistenti per il popup della posizione
                    setTimeout(() => {
                        const actionButtons = document.querySelectorAll('.feature-modal-btn');
                        if (actionButtons.length > 0) {
                            // Stile aggiornato per i pulsanti
                            actionButtons.forEach(btn => {
                                btn.style.width = 'auto';
                                btn.style.minWidth = '180px';
                                
                                // Se è il pulsante di copia
                                if (btn.classList.contains('copy-btn')) {
                                    // Aggiunge l'icona alla copia
                                    if (!btn.innerHTML.includes('fa-copy')) {
                                        btn.innerHTML = '<i class="fas fa-copy"></i> ' + btn.innerHTML;
                                    }
                                    
                                    // Modifica l'indirizzo da copiare
                                    btn.addEventListener('click', function() {
                                        navigator.clipboard.writeText('Via Alessandria, 41/b, 30173 Venezia VE');
                                    }, { once: true });
                                }
                                // Se è il pulsante di Google Maps
                                else if (btn.innerHTML.includes('Google Maps')) {
                                    // Aggiunge l'icona di navigazione
                                    if (!btn.innerHTML.includes('fa-location-arrow')) {
                                        btn.innerHTML = '<i class="fas fa-location-arrow"></i> ' + btn.innerHTML;
                                    }
                                }
                            });
                        }
                    }, 200);
                }, 100);
            });
        }
    }

    // Sostituisci la mappa nel footer con un pulsante per copiare l'indirizzo
    const footerMap = document.querySelector('.footer-map');
    if (footerMap) {
        footerMap.innerHTML = `
            <div class="address-display">
                <i class="fas fa-map-marker-alt address-icon"></i>
                <div class="address-content">
                    <p class="address-main">Via Alessandria 41/b - 43/a</p>
                    <p class="address-sub">30173 Tessera (VE)</p>
                    <button class="copy-address-btn">
                        <i class="fas fa-copy"></i> Copia indirizzo
                    </button>
                </div>
            </div>
        `;
        
        const copyBtn = footerMap.querySelector('.copy-address-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText('Via Alessandria, 41/b, 30173 Venezia VE');
                this.innerHTML = '<i class="fas fa-check"></i> Indirizzo copiato!';
                this.classList.add('copied');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copia indirizzo';
                    this.classList.remove('copied');
                }, 2000);
            });
        }
    }
}); 
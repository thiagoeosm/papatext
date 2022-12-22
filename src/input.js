import React, {useState, useEffect} from 'react'

const Input = () => {
    //Inputs
    const [eficiencia, setEficiencia] = useState()
    const [latenciaN, setLatenciaN] = useState()
    const [latencia, setLatencia] = useState()
    const [n2, setN2] = useState()
    const [n3, setN3] = useState()
    const [rem, setRem] = useState()
    const [microdespertares, setMicrodespertares] = useState()
    const [movMembros, setMovMembros] = useState()
    const [apneia, setApneia] = useState()
    const [saturacao, setSaturacao] = useState()
    const [saturacaoAbaixo, setSaturacaoAbaixo] = useState()
    const [reras, setReras] = useState()
    const [idr, setIdr] = useState()
    const [epworth, setEpworth] = useState()
    const [ronco, setRonco] = useState()
    const [intensRonco, setIntensRonco] = useState()
    //-----
    
    const [eficienciaOUT, setEficienciaOUT] = useState()
    const [latenciaNOUT, setLatenciaNOUT] = useState()
    const [latenciaOUT, setLatenciaOUT] = useState()
    const [n2OUT, setN2OUT] = useState()
    const [n3OUT, setN3OUT] = useState()
    const [remOUT, setRemOUT] = useState()
    const [arquitetura, setArquitetura] = useState()
    const [microdespertaresOUT, setMicrodespertaresOUT] = useState()
    const [movMembrosOUT, setMovMembrosOUT] = useState()
    const [apneiaOUT, setApneiaOUT] = useState()
    const [saturacaoOUT, setSaturacaoOUT] = useState()
    // Aqui seria saturacaoAbaixoOUT
    const [rerasOUT, setRerasOUT] = useState()
    // Aqui seria o idrOUT
    // Aqui seria epworthOUT
    const [roncoOUT, setRoncoOUT] = useState()
    const [conclusao, setConclusao] = useState()

    useEffect(()=>{
        if(n2 < 45) setN2OUT('redução')
        else if(n2 >= 45 && n2 <= 55) setN2OUT('normal')
        else if(n2 > 55) setN2OUT('aumento')
    },[n2])

    useEffect(()=>{
        if(n3 < 15) setN3OUT('redução')
        else if(n3 >= 15) setN3OUT('normal')
    },[n3])

    useEffect(()=>{
        if(rem < 20) setRemOUT('redução')
        else if(rem >= 20 && rem <= 25) setRemOUT('normal')
        else if(rem > 25) setRemOUT('aumento')
    },[rem])

    const formataRonco = (val) => {
        if(val === 'i') setRonco('intermitente,')
        else if (val === 'c') setRonco('contínuo,')
        else if (val === 'n'){
            setRonco('')
            setIntensRonco('')
            setRoncoOUT('Não houve registro de ronco no presente estudo;')
        }
    }

    const formataIntensRonco = (val) => {
        if(val === 'l') setIntensRonco('leve')
        else if (val === 'm') setIntensRonco('moderada')
        else if (val === 's') setIntensRonco('severa')
        else if (val === 'lm') setIntensRonco('leve a moderada')
        else if (val === 'ls') setIntensRonco('leve a severa')
        else if (val === 'ms') setIntensRonco('moderada a severa')
    }

    const atualizarValores = () => {
        if( eficiencia < 85) setEficienciaOUT(`Sono com eficiência reduzida (${eficiencia}%);`)
        else if( eficiencia >= 85) setEficienciaOUT(`Sono com eficiência normal (${eficiencia}%);`)
        
        if(latenciaN <= 5) setLatenciaNOUT('reduzida')
        else if(latenciaN > 5 && latenciaN <= 30) setLatenciaNOUT('normal')
        else if(latenciaN > 30) setLatenciaNOUT('aumentada')
        
        if(latencia <= 70) setLatenciaOUT('reduzida')
        else if(latencia > 70 && latencia <= 110) setLatenciaOUT('normal')
        else if(latencia > 110) setLatenciaOUT('aumentada')

        //ARQUITETURA DO SONO
        if(n2OUT==='normal' && n3OUT==='normal' && remOUT==='normal') setArquitetura('Arquitetura do sono preservada;')
        else{
            const arq = []
            let arqout

            if(n2OUT==='redução' || n2OUT==='aumento') arq.push({param: 'do estágio N2', value: n2OUT})
            if(n3OUT==='redução') arq.push({param: 'do estágio N3', value: n3OUT})
            if(remOUT==='redução' || remOUT==='aumento') arq.push({param: 'de sono REM', value: remOUT})

            if(arq.length===1) arqout = `${arq[0].value} do percentual ${arq[0].param}.`
            else if(arq.length===2) arqout = `${arq[0].value} do percentual ${arq[0].param} e ${arq[1].value} do percentual ${arq[1].param}.`
            else if(arq.length===3) arqout = `${arq[0].value} do percentual ${arq[0].param}, ${arq[1].value} do percentual ${arq[1].param} e ${arq[2].value} do percentual ${arq[2].param}.`

            setArquitetura(arqout.charAt(0).toUpperCase() + arqout.slice(1))
        }
        //FIM DA ARQUITETURA DO SONO

        if(microdespertares <= 10) setMicrodespertaresOUT(`Índice de microdespertares dentro dos limites da normalidade (${microdespertares}/hora)`)
        else{
            let micro
            if(microdespertares > 10 && microdespertares <= 25) micro = 'leve'
            else if(microdespertares > 25 && microdespertares <= 50) micro = 'moderado'
            else if(microdespertares > 50) micro = 'severo'

            setMicrodespertaresOUT(`Aumento ${micro} do índice de microdespertares (${microdespertares}/h)`)
        }

        let mov
        if(movMembros >= 5 && movMembros <= 25) mov = 'leve'
        else if(movMembros > 25 && movMembros <= 50) mov = 'moderado'
        else if(movMembros > 50) mov = 'severo'

        if (movMembros > 0 && movMembros < 5) setMovMembrosOUT(`. Movimento de membros inferiores dentro dos limites da normalidade (${movMembros}/hora);`)
        if (movMembros == 0) setMovMembrosOUT(';')
        if (movMembros >= 5) setMovMembrosOUT(`. Aumento ${mov} de movimento de membros inferiores (${movMembros}/hora);`)

        let apn
        if(apneia <= 5) {
            setApneiaOUT(`Índice de apneia/hipopneia (IAH ${apneia}/hora) dentro dos limites da normalidade;`)
            setConclusao(`Exame polissonográfico evidenciou número do IAH (${apneia}/hora) dentro dos limites da normalidade.`)
        }
        else{
            if(apneia > 5 && apneia <= 15) apn = 'leve'
            else if(apneia > 15 && apneia <= 30) apn = 'moderado'
            else if(apneia > 30) apn = 'severo'
            let associado = '.'
            if(epworth >= 10 && latenciaN <= 5) associado = ', associado a sinais de sonolência excessiva.'
            setApneiaOUT(`Aumento ${apn} do Índice de apneia/hipopneia (IAH ${apneia}/hora)`)
            reras > 0 ? setConclusao(`Exame polissonográfico evidenciou número elevado do IAH e do IDR que, associado à clínica, é compatível com apneia-hipopneia obstrutiva do sono de grau ${apn}${associado}`) :
            setConclusao(`Exame polissonográfico evidenciou número elevado do IAH que, associado à clínica, é compatível com apneia-hipopneia obstrutiva do sono de grau ${apn}${associado}`)
        }

        if (saturacao < 85) setSaturacaoOUT(`, associado à dessaturação da oxiemoglobina (mínima de ${saturacao}%). O percentual do tempo de sono com saturação abaixo de 90% foi de ${saturacaoAbaixo}%`)
        if (saturacao >= 85) setSaturacaoOUT(`. Não houve registro de dessaturação significativa da oxiemoglobina (mínima de ${saturacao}%), no presente estudo. O percentual do tempo de sono com saturação abaixo de 90% foi de ${saturacaoAbaixo}%`)
    
        if (reras > 0) setRerasOUT(`. Ocorreram ${reras} RERAs, resultando em índice de distúrbios respiratórios (IDR) de ${idr}/hora;`)
        else setRerasOUT(';')

        if(ronco !== '') setRoncoOUT(`Registro de ronco ${ronco} de intensidade ${intensRonco};`)
    }

    return(
        <div>
            <label>Eficiência do sono(%)</label>
            <input type="number" step=".01" name="eficiencia" onChange={event => setEficiencia(event.target.value)}/>
            <br /><br />

            <label>Latência sono NREM(min)</label>
            <input type="number" step=".01" name="nrem" onChange={event => setLatenciaN(event.target.value)}/>
            <br /><br />

            <label>Latência sono REM(min)</label>
            <input type="number" step=".01" name="rem" onChange={event => setLatencia(event.target.value)}/>
            <br /><br />

            <label>Estagio N2(%)</label>
            <input type="number" step=".01" name="n2" onChange={event => setN2(event.target.value)}/>
            <br /><br />

            <label>Estagio N3(%)</label>
            <input type="number" step=".01" name="n3" onChange={event => setN3(event.target.value)}/>
            <br /><br />

            <label>Sono REM(%)</label>
            <input type="number" step=".01" name="rem" onChange={event => setRem(event.target.value)}/>
            <br /><br />

            <label>Índice de micro despertares(/hora)</label>
            <input type="number" step=".01" name="microdespertares" onChange={event => setMicrodespertares(event.target.value)}/>
            <br /><br />

            <label>Movimento de membros inferiores(/hora)</label>
            <input type="number" step=".01" name="movimentomembros" onChange={event => setMovMembros(event.target.value)}/>
            <br /><br />

            <label>Índice de apneia/hipopneia(/hora)</label>
            <input type="number" step=".01" name="apneia" onChange={event => setApneia(event.target.value)}/>
            <br /><br />

            <label>Saturação da oxiemoglobina(%)</label>
            <input type="number" step=".01" name="saturacao" onChange={event => setSaturacao(event.target.value)}/>
            <br /><br />

            <label>Porcentual de sono com saturação abaixo de 90%(%)</label>
            <input type="number" step=".01" name="saturacaoabaixo" onChange={event => setSaturacaoAbaixo(event.target.value)}/>
            <br /><br />

            <label>Número de RERAS(/hora)*Colocar 0 se não houver*</label>
            <input type="number" step=".01" name="reras" onChange={event => setReras(event.target.value)}/>
            <br /><br />

            <label>Ronco (i, c ou n)</label>
            <input type="text" name="ronco" onChange={event => formataRonco(event.target.value)}/>
            <br /><br />

            <label>Intensidade do ronco (l, m ou s)</label>
            <input type="text" name="intensidaderonco" onChange={event => formataIntensRonco(event.target.value)}/>
            <br /><br />

            <label>IDR(/hora)*Colocar 0 se não houver*</label>
            <input type="number" step=".01" name="idr" onChange={event => setIdr(event.target.value)}/>
            <br /><br />

            <label>Escala de Sonolência de Epworth(#)</label>
            <input type="number" step=".01" name="epworth" onChange={event => setEpworth(event.target.value)}/>
            <br /><br />

            <input type="submit" value="Atualizar valores" onClick={atualizarValores} />
            
            <br /><br /><br /><br />
            <p style={{fontFamily: 'Arial'}}>{`1. ${eficienciaOUT}`}
            <br/>{`2. Latência ${latenciaNOUT} para o sono NREM (${latenciaN} min) e ${latenciaOUT} para o sono REM (${latencia} min);`}
            <br/>3. {arquitetura} {microdespertaresOUT}{movMembrosOUT}
            <br/>4. {apneiaOUT}{saturacaoOUT}{rerasOUT}
            <br/>5. {roncoOUT}
            <br/>6. {`Escala de sonolência de Epworth: ${epworth}`}
            <br/>7. {conclusao}
            <br/><br/><br/>Luiz Carlos Alves de Oliveira<br/>CRM 10202/RS
            </p>

        </div>
    )
}

export default Input
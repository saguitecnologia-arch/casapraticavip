'use strict';
(() => {
 const params=new URLSearchParams(location.search);
 // Remove code/state da URL atual antes de qualquer outra ação de interface.
 history.replaceState(null,'',location.pathname);
 const message=document.querySelector('#message');
 const result=document.querySelector('#result');
 const payload=document.querySelector('#payload');
 const code=params.get('code'),state=params.get('state');
 if(params.has('error')){
  document.querySelector('#title').textContent='Autorização não concluída';
  message.textContent='Volte ao assistente local e inicie novamente. Nenhuma chave deve ser informada nesta página.';
  return;
 }
 if(!code||code.length>2048||!state||!/^[A-Za-z0-9_-]{43}$/.test(state)||params.getAll('code').length!==1||params.getAll('state').length!==1){
  message.textContent='Página pronta. Para autorizar, comece pelo assistente local. Esta visita não contém um retorno válido.';
  return;
 }
 payload.value=JSON.stringify({code,state});
 result.hidden=false;
 message.textContent='Retorno recebido. Copie e conclua no assistente local que iniciou a autorização.';
 document.querySelector('#copy').onclick=async()=>{
  try{await navigator.clipboard.writeText(payload.value);message.textContent='Copiado. Cole somente no assistente local.';}
  catch{payload.focus();payload.select();message.textContent='Use Ctrl+C para copiar o texto selecionado.';}
 };
 document.querySelector('#clear').onclick=()=>{
  payload.value='';result.hidden=true;message.textContent='Retorno apagado desta página. Limpe também a área de transferência depois de concluir.';
 };
 setTimeout(()=>{payload.value='';result.hidden=true;message.textContent='Retorno removido após 5 minutos. Se não concluiu, reinicie pelo assistente local.';},5*60*1000);
})();

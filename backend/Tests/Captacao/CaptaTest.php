<?php

namespace Tests;

use App\Model\Captacao\Captacao;
use App\Control\Captacao\Lista;
use App\Control\Captacao\Save;
use App\Lib\Database\Transaction;

use PHPUnit\Framework\TestCase;
use Slim\Http\Response;

function makeSut()
{
  class Sut
  {
    public $data_confirm = array (
      'id_captacao' => '6604',
      'id_porto' => '1',
      'id_status' => '6',
      'id_despachante' => '11197705000167',
      'id_terminal_atracacao' => '4',
      'id_terminal_redestinacao' => '4',
      'id_proposta' => '492',
      'id_margem' => '2',
      'numero' => '6604',
      'bl' => 'HLCUPOS210650202',
      'nome_navio' => 'TEMPANOS / 2123S	',
      'dta_prevista_atracacao' => '2021-07-07',
      'imo' => 'nao',
      'ref_importador' => 'IMP-560/2021 -- 18770-21IM | KAISER - BL HLCUPOS210650202',
      'created_by' => 'Bianca de Paula',
      'updated_by' => 'Bianca de Paula',
      'break_bulk' => 'nao',
      'complementos' => 
      array (
        'notificacao' => 
        array (
        ),
        'eventos' => 
        array (
          0 => 
          array (
            'id_captacaoevento' => '20518',
            'id_forward' => NULL,
            'id_captacao' => '6604',
            'id_liberacao' => NULL,
            'id_processo' => NULL,
            'id_fatura' => NULL,
            'evento' => 'confcliente',
            'created_by' => NULL,
            'updated_by' => NULL,
            'created_at' => '2021-07-01 21:53:10',
            'updated_at' => NULL,
          ),
        ),
        'documentos' => 
        array (
          0 => 
          array (
            'id_upload' => '17432',
            'nome_original' => 'IServ...pdf',
            'token' => '8c358aa654242b2481520555539bc790',
            'updated_by' => 'Bianca de Paula',
            'url' => 'https://s3.amazonaws.com/gralsin.movimentacao%2Fiserv/72632402463164%23IServ...pdf',
            'created_at' => '2021-07-01 20:38:27',
            'id_tipodocumento' => '11',
            'tipodocumento' => 'iserv',
          ),
          1 => 
          array (
            'id_upload' => '17433',
            'nome_original' => 'CE.pdf',
            'token' => '82d854c9809368a51c4be181a57ac78b',
            'updated_by' => 'Bianca de Paula',
            'url' => 'https://s3.amazonaws.com/gralsin.movimentacao%2Fce_house/56912225673056%23CE.pdf',
            'created_at' => '2021-07-01 20:38:33',
            'id_tipodocumento' => '5',
            'tipodocumento' => 'ce house',
          ),
          2 => 
          array (
            'id_upload' => '17434',
            'nome_original' => 'DRAFT BL.pdf',
            'token' => '57f62ff38b309cb5ecae815c22fbb255',
            'updated_by' => 'Bianca de Paula',
            'url' => 'https://s3.amazonaws.com/gralsin.movimentacao%2Fbl/82852829991158%23DRAFT%20BL.pdf',
            'created_at' => '2021-07-01 20:38:42',
            'id_tipodocumento' => '3',
            'tipodocumento' => 'bl',
          ),
        ),
        'terminal_atracacao' => 
        array (
          0 => 'DPW',
        ),
        'containeres' => 
        array (
          0 => 
          array (
            'id_container' => '24519',
            'id_containertipo' => '2',
            'codigo' => 'BMOU5831903',
            'created_at' => '2021-08-03 07:26:49',
            'dimensao' => '40',
            'tipo' => 'ST4',
          ),
          1 => 
          array (
            'id_container' => '24520',
            'id_containertipo' => '2',
            'codigo' => 'HLBU1576377',
            'created_at' => '2021-08-03 07:26:49',
            'dimensao' => '40',
            'tipo' => 'ST4',
          ),
          2 => 
          array (
            'id_container' => '24521',
            'id_containertipo' => '2',
            'codigo' => 'GESU6391822',
            'created_at' => '2021-08-03 07:26:49',
            'dimensao' => '40',
            'tipo' => 'ST4',
          ),
        ),
      ),
    );

    private $data = array(
      'id_margem' => '2',
      'numero' => '6604',
      'id_proposta' => '492',
      'id_despachante' => '11197705000167',
      'id_porto' => '1',
      'id_terminal_atracacao' => '4',
      'id_terminal_redestinacao' => '4',
      'id_status' => '6',
      'ref_importador' => 'IMP-560/2021 -- 18770-21IM | KAISER - BL HLCUPOS210650202',
      'nome_navio' => 'TEMPANOS / 2123S	',
      'bl' => 'HLCUPOS210650202',
      'imo' => 'nao',
      'break_bulk' => 'nao',
      'dta_prevista_atracacao' => '2021-07-07T03:00:00.00Z',
      'dta_atracacao' => NULL,
      'container' =>
      array(
        'containeres' =>
        array(
          0 =>
          array(
            'codigo' => 'BMOU5831903',
            'tipo_container' => '2',
          ),
          1 =>
          array(
            'codigo' => 'HLBU1576377',
            'tipo_container' => '2',
          ),
          2 =>
          array(
            'codigo' => 'GESU6391822',
            'tipo_container' => '2',
          ),
        ),
      ),
      'documentos' =>
      array(
        0 =>
        array(
          'id_tipodocumento' => '11',
          'id_upload' => '17432',
        ),
        1 =>
        array(
          'id_tipodocumento' => '5',
          'id_upload' => '17433',
        ),
        2 =>
        array(
          'id_tipodocumento' => '3',
          'id_upload' => '17434',
        ),
      ),
    );

    function getStoreData()
    {
      $store = $this->data;
      array_splice($store, 1, 1);
      return $store;
    }

    function getUpdateData()
    {
      return $this->data;
    }
  }
  return new Sut;
}



class CaptacaoTest extends TestCase
{
  public function testStore()
  {
    $sut = makeSut();
    $save = new Save;
    $response = json_decode($save->store(null, null, $sut->getStoreData()), true);
    $res = $response['status'];
    $id = $response['id_captacao'];
    Transaction::open('zoho');
    $captacao = new Captacao($id);
    $captacao->delete();
    Transaction::close();
    $this->assertEquals($res, 'success');
  }

  // public function testeUpdate()
  // {
  //   $sut = makeSut();
  //   $save = new Save;
  //   $response = json_decode($save->store(null, null, $sut->getUpdateData()), true);
  //   $res = $response['status'];
  //   $id = $response['id_captacao'];
  //   Transaction::open('zoho');
  //   $list = new Lista;
  //   $cap = (object) json_decode($list->byid(null, null, $id), true)['items'][0];
  //   print_r($cap);
  //   Transaction::open('zoho');
  //   $captacao = new Captacao($id);
  //   $captacao->delete();
  //   // $this->assertEquals($cap, $sut->data_confirm);
  //   Transaction::close();
  // }

  

  // function clean(array $delete, $arr) {
  //   foreach($delete as $value) {
     
  //   }
  //   print_r(1);
  //   // return $arr;
  // }
}

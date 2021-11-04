<?php

namespace Tests;

use App\Lib\Database\Transaction;
use App\Control\Documento\Upload;

use PHPUnit\Framework\TestCase;
use Tuupola\Http\Factory\UploadedFileFactory;

class UploadTest extends TestCase
{
  public function testThrow()
  {
    UploadedFileFactory::fake();


    $data = Array ( "tipo_up" => "liberacao", "tipo_doc" => "di");
    $stub = $this->createStub(Upload::class);
    // Configure the stub.
    $stub->method('save')
         ->willReturn('foo');

    // Calling $stub->doSomething() will now return
    // 'foo'.
    $this->assertSame('foo', $stub->save($data));
  }
}

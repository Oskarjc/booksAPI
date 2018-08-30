<?php

namespace App\Models;


class Book extends Database
{
    private $table_name = "werner";
    private $primary_key = "id";
    private $fillable_columns = [
        'category_id',
        'author_id',
        'title',
        'description',
        'price',
        'isbn',
        'created_at',
        'updated_at'];

    public $sort_column = [];
    public $sort_direction = [];

    public function all($where = [], $group_by = [], $order_by = [], $start_row = [], $limit = 1)
    {
        return $this->getAll("SELECT * FROM {$this->table_name};");
    }

    public function one($id = 0)
    {
        return $this->getOne("SELECT * FROM {$this->table_name} WHERE {$this->primary_key} = :id;", ['id' => $id]);
    }

    public function save($columns = [], $id = null)
    {
        if (!empty($id)) {
            //update
            $columns['id'] = $id;
            $columns['updated_at'] = date("Y-m-d H:i:s");
            $this->execute("
         UPDATE {$this->table_name} SET
/*           category_id = :category_id,
*/           author_id = :author_id,
           title = :title,
           isbn = :isbn,
           description = :description,
           price = :price,
           updated_at = :updated_at
          WHERE {$this->primary_key} = :id
        ", $columns);
        } else {
            //insert
            $columns['created_at'] = date("Y-m-d H:i:s");
            $return = $this->execute("
         INSERT INTO {$this->table_name} (category_id,author_id,title,isbn,description,price,created_at)
         VALUES(
/*           :category_id,
*/           :author_id,
           :title,
           :isbn,
           :description,
           :price,
           :created_at
           )
        ", $columns);
            $id = $return->lastInsertId();

        }
        return $id;
    }

    public function delete($id = null)
    {
        if (!empty($id)) {
            $return = $this->execute("DELETE FROM {$this->table_name} WHERE {$this->primary_key} = :id", ['id' => $id]);
        }

        return true;
    }

    public function downVote($id = null)
    {
        if (!empty($id)) {
            $return = $this->execute("UPDATE {$this->table_name} SET `votes` = `votes` -1 
                                            WHERE {$this->primary_key} = :id", ['id' => $id]);
        }

        return true;
    }

    public function upVote($id = null)
    {
        if (!empty($id)) {
            $return = $this->execute("UPDATE {$this->table_name} SET `votes` = `votes` +1 
                                            WHERE {$this->primary_key} = :id", ['id' => $id]);
        }

        return true;
    }


}
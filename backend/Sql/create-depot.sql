CREATE TABLE Depot (
    id_depot INT UNSIGNED NOT NULL PRIMARY KEY,
    id_individuo VARCHAR(50) UNSIGNED NOT NULL,
    margem ENUM('direita', 'esquerda', 'ambas') NULL DEFAULT 'ambas',
    CONSTRAINT fk_depot_individuo FOREIGN KEY (id_individuo) REFERENCES Individuo(id_individuo) 
)
DEFAULT CHARACTER SET = utf8;


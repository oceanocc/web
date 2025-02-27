$(function()
{
    function TransformESDate(date)
    {
        const [day, month, year] = String(date).split('/').map(Number);
        return new Date(year, month - 1, day);
    }
    function TransformDate(date)
    {
        const [year, month, day] = String(date).split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    
    function FilterSales(agent_id, password, from, to, sales)
    {
        if(agent_id == "27032394" && password == "ZFkaSxgIc8")
        {
            return sales.filter(sale => 
                TransformESDate(sale.fecha_encuesta) >= TransformDate(from)
                && TransformESDate(sale.fecha_encuesta) <= TransformDate(to)
            );
        }
        if(agent_id == "20362654" && password == "BL5wIZSFqk")
        {
            return sales.filter(sale => 
                TransformESDate(sale.fecha_encuesta) >= TransformDate(from)
                && TransformESDate(sale.fecha_encuesta) <= TransformDate(to)
            );
        }
        return sales.filter(sale => 
            sale.agent_id == agent_id
            && sale.password == password
            && TransformESDate(sale.fecha_encuesta) >= TransformDate(from)
            && TransformESDate(sale.fecha_encuesta) <= TransformDate(to)
        );
    }

    var sales = GetSales();

    $('#search_sales_states').submit(function(e)
    {
        e.preventDefault();
        var agent_id = $('#agent_id').val();
        var password = $('#password').val();
        var from = $('#from').val();
        var to = $('#to').val();

        if (agent_id == "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese su identificación</div>');
            return;
        }
        if (password == "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese su contrase&ntilde;a</div>');
            return;
        }
        if (from == "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese fecha "Desde"</div>');
            return;
        }
        if (to == "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese fecha "Hasta"</div>');
            return;
        }

        var filtered_sales = FilterSales(agent_id, password, from, to, sales);
        $('#results_table tbody').empty();

        if (filtered_sales.length == 0)
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-info" role="alert">No se encontraron ventas para el agente con identificación ' + agent_id + ' en el rango de tiempo establecido</div>');
            return;
        }
        $('.notifications').empty();
        $.each(filtered_sales, function(index, sale) 
        {
            $('#results_table tbody').append(`
                <tr>
                    <td>${sale.agent_id}</td>
                    <td>${sale.dn}</td>
                    <td>${sale.status}</td>
                    <td>${sale.fecha_encuesta}</td>
                    <td>${sale.fecha_activacion}</td>
                    <td>${sale.fecha_alta}</td>
                    <td>${sale.fecha_baja}</td>
                    <td>${sale.dias_exportacion}</td>
                </tr>`
            );

        });
    });
});
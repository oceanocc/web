$(function()
{
    function FilterSales(agent_id, from, to, sales)
    {
        return sales.filter(sale => sale.agent_id == agent_id && sale.columns[2] >= from && sale.columns[2] <= to);
    }

    var sales = GetSales();

    $('#search').submit(function(e)
    {
        e.preventDefault();
        var agent_id = $('#agent_id').val();
        var from = $('#from').val();
        var to = $('#to').val();

        if (agent_id == "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese su identificación</div>');
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

        var filtered_sales = FilterSales(agent_id, from, to, sales);
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
            let columns = "";
            for(let col of sale.columns)
            {
                columns += '<td>' + col + '</td>';
            }
            $('#results_table tbody').append('<tr>' + columns + '</tr>');

        });
    });
});
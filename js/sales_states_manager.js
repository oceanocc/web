$(function()
{
    function FilterSales(agent_id, sales)
    {
        return sales.filter(sale => sale.agent_id == agent_id);
    }

    var sales = GetSales();

    $('#search').click(function()
    {
        var agent_id = $('#agent_id').val();

        if (agent_id === "")
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-warning" role="alert">Por favor, ingrese su identificación</div>');
            return;
        }

        var filtered_sales = FilterSales(agent_id, sales);
        $('#results_table tbody').empty();

        if (filtered_sales.length === 0)
        {
            $('.notifications').empty();
            $('.notifications').append('<div class="alert alert-info" role="alert">No se encontraron ventas para el agente con identificación ' + agent_id + '</div>');
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
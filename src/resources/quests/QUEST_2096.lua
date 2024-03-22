QUEST_2096 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001060',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 105,
		max_level = 129,
		job = { 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1250826956,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_ANTEGG', quantity = 50, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001061',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001062',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001063',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001064',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001065',
		},
	}
}

QUEST_2087 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000958',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 108,
		max_level = 114,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 1000000,
		exp = 699928485,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BLAD', quantity = 70, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000959',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000960',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000961',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000962',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000963',
		},
	}
}

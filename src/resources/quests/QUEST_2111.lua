QUEST_2111 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001230',
	character = 'MaHa_Jano',
	end_character = 'MaHa_Jano',
	start_requirements = {
		min_level = 120,
		max_level = 129,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 1117662809,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_SKELTOOLBOX', quantity = 40, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001231',
			'IDS_PROPQUEST_REQUESTBOX_INC_001232',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001233',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001234',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001235',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001236',
		},
	}
}
